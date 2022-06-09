const mongoose = require('mongoose');
const express = require('express');

const cors = require('cors');

const routes = require('./routes');
class App {
  constructor() {
    this.server = express();

    this.database();
    this.middlewares();
    this.routes();
    // this.exceptionHandler();
  }
  
  middlewares() {
    this.server.use(cors())
    this.server.use(express.json());

    // this.server.use(
    //   '/files',
    //   express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    // );
  }
  
  routes() {
    this.server.use(routes);
  }

  database() {
    require('dotenv').config({ path: '.env.example' });
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL)
  
    mongoose.connection.on('error', (err) => {
      console.log('Erro na conexão com o banco de dados: ' + err)
    })
  
    mongoose.connection.on('disconnected', () => {
      console.log('Aplicação desconectada do banco de dados!')
    })
  
    mongoose.connection.on('connected', () => {
      console.log('Aplicação conectada ao banco de dados!')
    })
  }
}

module.exports = new App().server;
