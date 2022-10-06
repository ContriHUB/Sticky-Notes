const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const fetchuser = (req, res, next) => {
  //Get user details from the jwt-token and add id to req object(body)
  console.log(req.cookies);
  const token = req.cookies["auth-token"];
  console.log("hello", token);
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};

module.exports = fetchuser;
