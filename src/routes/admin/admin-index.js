const express = require("express");
const router = express.Router();
const controller = require("./admin-controller");

router.get("/", controller.dashboard);

module.exports = router;
