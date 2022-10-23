const connectToMongo = require("./db");
const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");
const redirectToHomeIfLoggedIn = require("./middleware/redirectToHomeIfLoggedIn");

connectToMongo();

const app = express();
var cors = require("cors");
app.use(cookie());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

//EJS
// app.use(expressLayout);
app.set("view engine", "ejs");

const port = 5001;

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

//Routes

app.get("/login", redirectToHomeIfLoggedIn, (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
