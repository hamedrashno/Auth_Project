

const express = require("express");
const app = express();
require("./src/startup/db")();
require("./src/startup/config")(app,express);
require("./src/startup/logging")();

const router = require("./src/routes/general-router");





app.use("/api", router);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));
