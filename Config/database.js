const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Db Connected SuccessFully");
    })
    .catch((err) => {
      console.log("DB connection Issue");
      console.error(err);
      process.exit(1);
    });
};
