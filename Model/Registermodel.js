const mongoose = require("mongoose");

const Registerschema = new mongoose.Schema({
  nameofproperty: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("register", Registerschema);
