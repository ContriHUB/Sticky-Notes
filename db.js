const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection Successful to Database");
    })
    .catch((err) => {
      console.log("No Connection");
      console.log(err);
    });
};

module.exports = connectToMongo;
