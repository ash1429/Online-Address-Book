var mongoose = require("mongoose");

var acquiantanceSchema = new mongoose.Schema({
  name: { type: String },
  email: String,
  phone: [Number]
});

module.exports = mongoose.model("Acquiantance", acquiantanceSchema);