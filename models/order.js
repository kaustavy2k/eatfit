const mongoose = require("mongoose");
const userOrder = new mongoose.Schema({
  emailid: String,
  food: Object,
  price:String
});
const orders = mongoose.model("orders", userOrder);
module.exports = orders;
