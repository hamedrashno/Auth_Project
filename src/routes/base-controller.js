const autoBind = require("auto-bind");
const { body, validationResult } = require("express-validator");
const User = require("./../models/userModel");
module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
  }

  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const messages = [];
      errors.forEach((err) => messages.push(err.msg));
      res.status(400).json({
        message: "validation Error",
        data: messages,
      });
      return false;
    }
    return true;
  }

  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    }

    next();
  }

  response({ res, message = "", code = 200, data = {} }) {
    console.log("response...");
    res.status(code).json({
      message,
      data,
    });
  }
};
