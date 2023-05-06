/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable quotes */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const mainRouter = require("./src/routes");
const server = express();
const PORT = 8080;

server.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use(mainRouter);

// If Router Error or Not Found then send this Message
server.use("/*", (request, response) => {
  response.status(404).send("Path Not Found");
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
