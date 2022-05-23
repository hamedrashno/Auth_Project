const baseController = require("../base-controller");

module.exports = new (class extends baseController {
  async dashboard(req, res) {
    // throw Error("Admin dashboard Faild");
    res.send("admin Dashboard");
  }
})();
