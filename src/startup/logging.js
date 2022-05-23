const winston = require("winston");
require("express-async-errors");
const debug = require("debug");
module.exports = function () {
  process.on("uncaughtException", (ex) => {
    debug(ex.message);
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
};
