const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Atributo "name" obrigatório'],
    validate: [
      v => /[A-Za-z]* [A-Za-z]/.test(v),
      'Insira pelo menos um sobrenome'
    ],  
  },
  email: {
    type: String,
    required: [true, 'Atributo "email" obrigatório'],
    lowercase: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Atributo "username" obrigatório'],
    lowercase: true,
    unique: true,  
  },
  password: {
    type: String,
    required: [true, 'Atributo "senha" obrigatório'],
  },
}, {
  timestamps: true,
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  const { 
    oldPassword,
    password,
    confirmPassword,
  } = this._update;

  const docToUpdate = await this.model.findOne(this.getFilter());
  if(!docToUpdate) return next(404);

  if (oldPassword && !(await docToUpdate.compareHash(oldPassword))) {
    return next("Senha incorreta");
  }

  if (password && (!oldPassword || !confirmPassword)) {
    return next("Faltam campos obrigatórios de senha");
  }

  if (!password) next();

  if (!uniforPassword) next();

  this._update.uniforPassword = await bcrypt.hash(uniforPassword, 8).catch(next);

  this._update.password = await bcrypt.hash(password, 8).catch(next);

  next();

});

UserSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 8); 
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);     
  },

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.AUTH_SECRET, {
      expiresIn: process.env.AUTH_EXPIRES_IN,
    });
  },
}

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
