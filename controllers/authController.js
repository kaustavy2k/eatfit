const users = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../utils/email");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
exports.signup = async (req, res) => {
  try {
    if (await users.findOne({ email: req.body.email })) {
      return res.status(500).json({
        status: "failure",
        message: {
          errors: {
            email: {
              message: "email already registered",
            },
          },
        },
      });
    } else {
      const newuser = await users.create(req.body);
      newuser.password = undefined;
      const token = signToken(newuser._id);
      res.cookie("jwt", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });

      res.status(200).json({
        status: "success",
        token,
        data: {
          user: newuser,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
exports.login = async (req, res) => {
  try {
    let correct;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        status: "failure",
        message: "Please provide email and password",
      });
    }

    const user = await users.findOne({ email });
    if (user) {
      correct = await bcrypt.compare(password, user.password);
    }
    if (!user || !correct) {
      return res.status(500).json({
        status: "failure",
        message: "Incorrext email or password",
      });
    }

    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    user.password = undefined;
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there

  let token = req.cookies.jwt;

  let decoded;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }

  if (!token) {
    return res.status(500).json({
      status: "failure",
      message: "you are not logged in. Please log in to continue",
    });
  }

  // 2) Verification token
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }

  //check if user still exists
  const currentUser = await users.findById(decoded.id);
  if (!currentUser) {
    return res.status(500).json({
      status: "failure",
      message: "the user doesnt exist anymore",
    });
  }
  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return res.status(500).json({
      status: "failure",
      message: "User recently changed password! Please log in again.",
    });
  }
  req.user = currentUser;
  next();
};

exports.forgotPassword = async (req, res) => {
  // 1) Get user based on POSTed email
  const user = await users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(500).json({
      status: "failure",
      message: "no email found",
    });
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email

  const message = `Forgot your password? Here is your reset token ${resetToken} Copy and Paste it `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
      resetToken,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await users.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return res.status(500).json({
        status: "failure",
        message: {
          errors: {
            token: {
              message: "Wrong Token",
            },
          },
        },
      });
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT

    user.password = undefined;
    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    // 1) Get user from collection
    const user = await users.findById(req.user.id);

    // 2) Check if POSTed current password is correct
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return res.status(500).json({
        status: "failure",
        message: {
          errors: {
            email: {
              message: "Your password is wrong",
            },
          },
        },
      });
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    //4)login user
    user.password = undefined;
    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
