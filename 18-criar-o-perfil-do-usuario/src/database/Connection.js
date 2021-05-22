//const mongoose  require('mongoose');
import mongoose from 'mongoose';

const DB_PASS= process.env.DB_PASS;
const DB_HOST= process.env.DB_HOST;
const DB_USER= process.env.DB_USER;
const DB_NAME= process.env.DB_NAME;

//mongodb+srv://<user>:<passw>@<host>/<db_name>
const uri = (!DB_HOST) 
    ? `mongodb://localhost/database` // se for verdade
    : `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

//`mongodb+srv://admin:backend@clusteradsbackend.rsmjf.mongodb.net/backendDB?retryWrites=true&w=majority`;
//mongodb://localhost/<db_name>
class Connection {
  constructor() {
    this.mongodb();
  }
  //uri: mongodb+srv://<user>:<password>@<host>/<database>
  mongodb() {
    console.log(`uri: ${uri}`);
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }).then(() => {
      console.log("Conexão com o MongoDb realizada com sucesso!");
    }).catch((exception) => {
      console.log("Erro: Conexão com MongoDB não foi realizada com sucesso" + exception);
    });
  }
}

//module.exports = new Connection();
export default new Connection();