const baseController = require("../base-controller");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = new (class extends baseController {
  async register(req, res) {
    console.log(req.body.email);
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: "this user already regestered",
      });
    }
    const { email, name, password } = req.body;
    user = new this.User({ email, name, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    return this.response({
      res,
      message: "Success...",
      data: { id: user._id, name: user.name, email: user.email },
    });
  }

  async login(req, res) {
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "invalid email or password",
      });
    }
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return this.response({
        res,
        code: 400,
        message: "invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, config.get("jwt_key"));

    this.response({ res, message: "Success Logged In", data: { token } });
  }
})();
