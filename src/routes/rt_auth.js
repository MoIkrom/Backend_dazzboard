const authRouter = require("express").Router();
const { Register } = require("../controllers/c_auth");

authRouter.post("/", Register);
// login
// authRouter.post('/', body('email', 'password'), authController.login);
// logout
// authRouter.delete("/", isLogin(), authController.logout);

module.exports = authRouter;
