var mongoose = require("mongoose");
var Acquiantance = require("./acquiantance");

var contactSchema = new mongoose.Schema({
  owner:{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true
    },
    name: { type: String, required: true },
  },
  acquiantances: [Acquiantance.schema]
});

module.exports = mongoose.model("Contact", contactSchema);