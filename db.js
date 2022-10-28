const mongoose = require("mongoose");
const dotenv = require("dotenv");

// below statement is not working but using the name of configuratin file it works
// dotenv.config({ path: "./.env" });
dotenv.config({ path: "config.env" });

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
