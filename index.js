

const express = require("express");
const app = express();
require("./startup/db")();
require("./startup/config")(app,express);
require("./startup/logging")();

const router = require("./src/routes/general-router");





app.use("/api", router);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));
