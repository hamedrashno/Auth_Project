const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

async function isLoggined(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("access denied");

  try {
    const decoded = jwt.verify(token, config.get("jwt_key"));
    console.log(decoded);
    // @ts-ignore
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}

async function isAdmin(req, res, next) {
  if (!req.user.isAdmin)
    return res.status(403).send("access denied: not admin");
  next();
}
module.exports = {
  isLoggined,
  isAdmin,
};
