const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const TracksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Atributo "name" obrigatório'],
      unique: true,
    },
    audio: {
      type: String,
      required: [true, 'Atributo "audio" obrigatório'],
    },
    singers: {
      type: String,
      required: [true, 'Atributo "singers" obrigatório'],
    },
    duration: {
      type: number,
      required: [true, 'Atributo "duration" obrigatório'],
    },
    playlists: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tracks', TracksSchema);
