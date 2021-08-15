exports.getAllFood = (req, res) => {
  let name = req.user.name;
  let email = req.user.email;
  res.status(200).json({
    name: name,
    email
  });
};
