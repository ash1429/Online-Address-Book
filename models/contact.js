var mongoose = require("mongoose");

var acquiantanceSchema = new mongoose.Schema({
  name: {type: String},
  email: String,
  phone: [Number]
});

var contactSchema = new mongoose.Schema({
  owner:{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true
    },
    name: { type: String, required: true },
  },
  acquiantances: [acquiantanceSchema]
});

module.exports = mongoose.model("Contact", contactSchema);