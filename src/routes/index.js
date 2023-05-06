const express = require("express");

const mainRouter = express.Router();

// menghubungkan router ke product
const authRouter = require("./rt_auth");

const prefix = "/api/v1";

mainRouter.use(`${prefix}/auth`, authRouter);

module.exports = mainRouter;
