const baseController = require("../base-controller");

module.exports = new (class extends baseController {
  async dashboard(req, res) {
    console.log(req.user);
    res.send("User Dashboard");
  }

  async me(req, res) {
    //We have USER from isLoggedIn middleware : req.user = user;
    this.response({
      res,
      data: { name: req.user.name, email: req.user.email },
    });
  }
})();
