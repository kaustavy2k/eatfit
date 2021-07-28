const food = require("../models/food");
const ailment = require("../models/ailment");
const sendEmail = require("../utils/email");
const ailments = require("../models/ailment");
// exports.book = async (req, res) => {
//   try {
//     data = {
//       id: req.user.id,
//       name: req.user.name,
//       type: req.body.type,
//       time: req.body.time,
//     };
//     const newbook = await book.create(data);
//     //Error email pn heroku
//     await sendEmail({
//       email: req.user.email,
//       subject: "Booking Confirmation",
//       message: `Your booking for ${data.type} is confirmed on ${data.time}`,
//     });
//     res.status(200).json({
//       message: "success",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       status: "failure",
//       message: err,
//     });
//   }
// };
exports.getFood = async (req, res) => {
  try {
    const foods = await food.find({ _id: req.query.id });
    if (foods.length != 0) {
      res.status(200).json({
        message: "your food",
        food: foods,
      });
    } else {
      res.status(200).json({
        message: "no food found",
        food: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
exports.getFoodAll = async (req, res) => {
  try {
    const foods = await food.find({});
    if (foods.length != 0) {
      res.status(200).json({
        message: "your food",
        food: foods,
      });
    } else {
      res.status(200).json({
        message: "your food",
        food: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.foodAdd = async (req, res) => {
  try {
    data = {
      name: req.body.name,
      protein: req.body.protein,
      fat: req.body.fat,
      carbohydrates: req.body.protein,
      calories: req.body.calories,
      specificity: req.body.specificity,
      highcontent: req.body.highcontent,
      ailment: "60fef8e6484fbde4a7a94250",
    };
    await food.create(data);
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.getFoodFilter = async (req, res) => {
  try {
    // const foods = await food.find({});;

    let filter = req.body.filter;
    if (
      filter.ailment.length == 0 &&
      filter.specific.length == 0 &&
      filter.other.length == 0
    ) {
      const foods = await food.find({});
      if (foods.length != 0) {
        return res.status(200).json({
          message: "your food",
          food: foods,
        });
      } else {
        return res.status(200).json({
          message: "your food",
          food: [],
        });
      }
    }
    let highcontent = ["protein", "fat", "carbohydrates"],
      lowcontent = ["protein", "fat", "carbohydrates"],
      other = ["gym", "pregnant", "cholesterol", "diabetic"],
      ailment = ["60fef263484fbde4a7a9424e", "60fef8e6484fbde4a7a94250"],
      highcontentnew = [],
      lowcontentnew = [];
    filter.specific.forEach((i) => {
      if (i.id == 1) {
        highcontentnew.push(i.value);
      } else {
        lowcontentnew.push(i.value);
      }
    });
    if (filter.other.length) {
      other = filter.other;
    }
    if (filter.ailment.length) {
      ailment = filter.ailment;
    }
    if (highcontentnew.length) {
      highcontent = highcontentnew;
    }
    if (lowcontentnew.length) {
      lowcontent = lowcontentnew;
    }
    // console.log(ailment, highcontent, lowcontent, other);
    const foods = await food.find({
      ailment: {
        $in: [...ailment],
      },

      highcontent: {
        $in: [...highcontent],
      },

      lowcontent: {
        $in: [...lowcontent],
      },
      specificity: {
        $in: [...other],
      },
    });
    // console.log(foods);
    if (foods.length != 0) {
      res.status(200).json({
        message: "your food",
        food: foods,
      });
    } else {
      res.status(200).json({
        message: "your food",
        food: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
