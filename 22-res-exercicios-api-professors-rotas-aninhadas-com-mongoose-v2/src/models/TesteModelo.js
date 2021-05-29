import  mongoose from 'mongoose'

const DB_PASS= process.env.DB_PASS;
const DB_HOST= process.env.DB_HOST;
const DB_USER= process.env.DB_USER;
const DB_NAME= process.env.DB_NAME;

mongoose.connect(//(DB_HOST) ? remoto : local
        (DB_HOST) ? `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority` 
        : "mongodb://localhost/adsbackend", {
      useNewUrlParser: true,
      useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com o MongoDb realizada com sucesso!");
}).catch((exception) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso" + exception);
});

const UserSchema = new mongoose.Schema({
    nome: String,
    sexo: String,
    email: String,
    endereco: {
        cidade: String,
        quadra: String,
        rua: String,
        estado: String,
        cep: String,
        complemento: String
    }
}, {
    timestamps: true, discriminatorKey: '_role'
});



const UserModel = mongoose.model("user", UserSchema);

const MedicoModel = UserModel.discriminator("Medico", new mongoose.Schema({
    crm: String,
    senha: String
}));

const AtendenteModel = UserModel.discriminator("Atendente", new mongoose.Schema({
    senha: String
}));

const PacienteModel = UserModel.discriminator("Paciente", new mongoose.Schema({}));

const paciente1 = {
    nome: "Paciente 1",
    sexo: "M",
    email: "email do paciente",
    endereco: {
        cidade: "cidade 1",
        quadra: "quadra 1",
        rua: "rua 1",
        estado: "DF"
    }
}

const atendente1 = {
    nome: "Atendente 1",
    sexo: "F",
    email: "email da atendente",
    endereco: {
        cidade: "cidade 1",
        quadra: "quadra 1",
        rua: "rua 1",
        estado: "DF"
    }
}

const medico1 = {
    nome: "Medico 1",
    sexo: "M",
    email: "email do medico",
    endereco: {
        cidade: "cidade 1",
        quadra: "quadra 1",
        rua: "rua 1",
        estado: "DF"
    }
}

const user1 = {
    nome: "Usuário Genérico",
    sexo: "M",
    email: "email do usuario generico",
    endereco: {
        cidade: "cidade 1",
        quadra: "quadra 1",
        rua: "rua 1",
        estado: "DF"
    }
}

try {

    // POST CRIAR 
    const pacienteDoc = await PacienteModel.create(paciente1);
    const medicoDoc = await MedicoModel.create(medico1);
    medico1.nome  = "Medico 2";
    const medicoDoc2 = await MedicoModel.create(medico1);
    const atendenteDoc = await AtendenteModel.create(atendente1);
    const userDoc = await UserModel.create(user1);

    console.log("paciente inserido:")
    console.log(pacienteDoc)

    console.log("medico 1 inserido:")
    console.log(medicoDoc)

    console.log("medico 2 inserido:")
    console.log(medicoDoc2)

    console.log("atendente inserido:")
    console.log(atendenteDoc)

    console.log("usuario generico inserido:")
    console.log(userDoc)

    // GET Listar
    console.log("Listar pacientes")
    const pacientesCollection = await PacienteModel.find({});
    console.log(pacientesCollection)

    console.log("Listar medicos")
    const medicosCollection = await MedicoModel.find({});
    console.log(medicosCollection)

    console.log("Listar atendentes")
    const atendentesCollection = await AtendenteModel.find({});
    console.log(atendentesCollection)

    console.log("Listar usuarios")
    const usuariosCollection = await UserModel.find({});
    console.log(usuariosCollection)

} catch(err) {
        console.log(err)
}
