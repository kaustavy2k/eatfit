const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  ailment: String,
  name: String,
  calories: String,
  protein: String,
  carbohydrates: String,
  fat: String,
  specificity:String,
  highcontent:String,
  lowcontent:String,
});
const food = mongoose.model("foods", userSchema);
module.exports = food;
