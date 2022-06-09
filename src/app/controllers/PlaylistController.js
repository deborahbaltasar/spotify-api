// const User = require('../models/User');
const Playlist = require('../models/Playlist');
// const User = require('../models/User');

const { error } = require('../../errors/Error');

class PlaylistController {
  async createPlaylist(req, res) {
    Playlist.create({ ...req.body })
      .then(playlist => {
        return res.status(201).json({ data: playlist });
      })
      .catch(event => {
        if (event.code === 11000) {
          const keyName = Object.keys(event.keyValue);

          return error(400, 'alreadyExists', res, 'playlist', `${keyName}`);
        } else if (e.errors) {
          const keyName = Object.keys(e.errors);
          return res.status(400).json({
            message: e.errors[keyName[0]].properties.message,
            errors: e.errors,
          });
        } else {
          return error(500, 'internalCreation', res);
        }
      });
  }

  async getPlaylistById(req, res) {
    const { id } = req.params;

    const playlist = await Playlist.findById(id).select(
      '_id name cover type tracks'
    );

    if (!playlist) {
      return error(404, 'notFound', res, 'Playlist');
    }

    return res.json({ data: playlist });
  }

  async getPlaylists(req, res) {
    const playlists = await Playlist.paginate(req.query, {
      ...req.options,
      select: '_id name cover type tracks',
    });
    return res.json({
      data: playlists.docs,
      total: playlists.totalDocs,
    });
  }

  // async getPlaylistsByStatus(req, res) {
  //   const { user_id } = req.params;
  //   const { type } = req.query;

  //   if (!type) return console.log('n tem tipo');

  //   const user = await User.findById(user_id);

  //   const playlists = await Playlist.paginate(req.query, {
  //     ...req.options,
  //     select: '_id name cover type tracks',
  //   });
  //   return res.json({
  //     data: playlists.docs,
  //     total: playlists.totalDocs,
  //   });
  // }

  async deletePlaylist(req, res) {
    const { id } = req.params;

    const playlist = await Playlist.findByIdAndDelete(id).select(
      '_id name cover type tracks'
    );

    if (!playlist) {
      return error(404, 'notFound', res, 'Playlist');
    }

    return res.json({ data: playlist });
  }

  async updatePlaylist(req, res) {
    const update = {
      ...req.body,
    };

    Plylist.findByIdAndUpdate(req.playlistId, update, { new: true })
      .then(playlist => {
        if (!playlist) {
          return error(404, 'notFound', res, 'Playlist');
        }

        return res.json({ data: playlist });
      })
      .catch(event => {
        if (event.code === 11000) {
          const keyName = Object.keys(event.keyValue);

          return error(400, 'alreadyExists', res, 'playlist', `${keyName}`);
        } else {
          return error(500, 'internalCreation', res);
        }
      });
  }
}

module.exports = new PlaylistController();
