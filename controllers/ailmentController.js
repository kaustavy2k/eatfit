const ailment = require("../models/ailment");
const sendEmail = require("../utils/email");
// exports.getFood = async (req, res) => {
//   try {
//     const foods = await food.find({ _id: req.query.id });
//     if (foods.length != 0) {
//       res.status(200).json({
//         message: "your food",
//         food: foods,
//       });
//     } else {
//       res.status(200).json({
//         message: "no food found",
//         food: [],
//       });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       status: "failure",
//       message: err,
//     });
//   }
// };
exports.getAilmentAll = async (req, res) => {
  try {
    const ailments = await ailment.find({});;
    if (ailments.length != 0) {
      res.status(200).json({
        message: "your ailment",
        ailment: ailments,
      });
    } else {
      res.status(200).json({
        message: "your ailment",
        ailment: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

// exports.foodAdd = async (req, res) => {
//   try {
//     data = {
//       name: req.body.name,
//       protein: req.body.protein,
//       fat: req.body.fat,
//       carbohydrates: req.body.protein,
//       calories: req.body.calories,
//       specificity: req.body.specificity,
//       highcontent: req.body.highcontent,
//       ailment: "60fef8e6484fbde4a7a94250",
//     };
//     await ailment.create(data);
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
