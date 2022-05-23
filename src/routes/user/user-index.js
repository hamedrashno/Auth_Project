const express = require("express");
const router = express.Router();
const controller = require("./user-controller");

router.get("/", controller.dashboard);

router.get("/me", controller.me);

module.exports = router;
