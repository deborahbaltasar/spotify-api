const express = require("express");
const sessionRouter = express.Router();

const SessionController = require("../app/controllers/SessionController");

sessionRouter.post('/', SessionController.create)


module.exports = sessionRouter;