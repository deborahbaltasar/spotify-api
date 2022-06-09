const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const PlaylistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Atributo "name" obrigatório'],
      unique: true,
    },
    cover: {
      type: String,
      required: [true, 'Atributo "cover" obrigatório'],
    },
    type: {
      default: 'public',
      enum: ['public', 'private'],
      type: String,
      required: [true, 'Atributo "type" obrigatório'],
    },

    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tracks' }],

    created_by: {
      type: String,
      required: [true, 'Atributo "created_by" obrigatório'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Playlist', PlaylistSchema);
