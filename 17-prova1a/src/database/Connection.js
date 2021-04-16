//const mongoose  require('mongoose');
import mongoose from 'mongoose';

const matricula = "MATRICULA";
const uri = `mongodb+srv://admin:9Reg3GqvMuPSEXD@clusterads.qf8mg.gcp.mongodb.net/${matricula}?retryWrites=true&w=majority`;

class Connection {
  constructor() {
    this.mongodb();
  }
  //uri: mongodb+srv://<user>:<password>@<host>/<database>
  mongodb() {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("Conexão com o MongoDb realizada com sucesso!");
    }).catch((exception) => {
      console.log("Erro: Conexão com MongoDB não foi realizada com sucesso" + exception);
    });
  }
}

//module.exports = new Connection();
export default new Connection();