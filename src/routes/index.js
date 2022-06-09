const express = require('express');

const userRouter = require('./userRouter');
const sessionRouter = require('./sessionRouter');
const playlistRouter = require('./playlistRouter');

const routes = express.Router();

routes.use('/users', userRouter);
routes.use('/session', sessionRouter);
routes.use('/playlists', playlistRouter);

module.exports = routes;
