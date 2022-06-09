const express = require('express');

const authMiddleware = require('../app/middlewares/auth');
const PlaylistController = require('../app/controllers/PlaylistController');

const playlistRouter = express.Router();

playlistRouter.post('/', PlaylistController.createPlaylist);

playlistRouter.use(authMiddleware);

playlistRouter.get('/:id', PlaylistController.getPlaylistById);

playlistRouter.get('/', PlaylistController.getPlaylists);

// playlistRouter.get('/:user_id', PlaylistController.getPlaylistsByStatus);

playlistRouter.delete('/:id', PlaylistController.deletePlaylist);

playlistRouter.put('/', PlaylistController.updatePlaylist);

module.exports = playlistRouter;
