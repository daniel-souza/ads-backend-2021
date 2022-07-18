//const mongoose  require('mongoose');
import mongoose from 'mongoose';
import dbConfig from '../configs/dbConfig.js';

class Connection {
  constructor() {
    this.mongodb();
  }
  //uri: mongodb+srv://<user>:<password>@<host>/<database>
  mongodb() {
    mongoose.connect(//(DB_HOST) ? remoto : local
        (dbConfig.DB_HOST !== "localhost") 
          ? `mongodb+srv://${dbConfig.DB_USER}:${dbConfig.DB_PASS}@${dbConfig.DB_HOST}/${dbConfig.DB_NAME}?retryWrites=true&w=majority` 
          : `mongodb://${dbConfig.DB_HOST}/adsbackend`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("Conexão com o MongoDb realizada com sucesso!");
    }).catch((exception) => {
      console.log("Erro: Conexão com MongoDB não foi realizada com sucesso. " + exception);
    });
    
  }
}

//module.exports = new Connection();
export default new Connection();