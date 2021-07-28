const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  ailment: String,
});
const ailments = mongoose.model("ailments", userSchema);
module.exports = ailments;
