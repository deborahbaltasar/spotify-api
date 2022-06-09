const express = require("express");

const userRouter = require('./userRouter');
const sessionRouter = require('./sessionRouter');

const routes = express.Router();

routes.use('/users', userRouter);
routes.use('/session', sessionRouter);

module.exports = routes;
