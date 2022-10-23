const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const redirectToHomeIfLoggedIn = (req, res, next) => {
  //Get user details from the jwt-token and add id to req object(body)
  const token = req.cookies["auth-token"];
  if (!token) {
    return res.redirect("/login");
  }
  
  // Checking if we are able to get user details, this means that user is already logged in
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return res.redirect("/api/auth/console"); // So we redirect the user to home
  } catch (err) {
    next(); // Else we just continue to the requested page
  }
};

module.exports = redirectToHomeIfLoggedIn;
