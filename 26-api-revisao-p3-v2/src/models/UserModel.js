import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import adminConfig from '../configs/adminConfig.js';

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    sexo: {
        type: String,
        required: true,
        enum: ['F', 'M']
    },
    data_nasc: Date,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    }
}, {
    timestamps: true, // createdAt updatedAt
    discriminatorKey: "role" // para hierarquia de esquemas
});

UserSchema.pre("save", function (next) {
    const user = this;
    // apenas realizamos o hash à senha se esta estiver sido modificada (ou seja nova)
    if (!user.isModified('senha')) return next();
    bcrypt.hash(user.senha, 8, (err, hash) => {
        if (err) return next(err);
        user.senha = hash;
        return next();
    });
});


export const GenaralUserModel = mongoose.model('Usuario', UserSchema);
export const AdminModel = GenaralUserModel.discriminator('Admin', new mongoose.Schema({}));
export const UserModel = GenaralUserModel.discriminator('User', new mongoose.Schema({
    produtos: [{
        nome: {
            type: String,
            required: true,
            trim: true
        },
        categoria: String,
        valor: {
            type: Number,
            min: 0
        },
        comentarios: [{
            data_hora: {
                type: Date,
                required: true,
                default: Date.now()
            },
            conteudo: {
                type: String,
                required: true,
                trim: true
            },
            usuario: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario' // definido na linha 60 -> o nome do modelo
            }
        }]
    }]
}));

export default UserModel;


try {
    await AdminModel.createCollection();
    const admin = new AdminModel(adminConfig);
    await admin.save();
} catch(err) {
    // MongoDB error code 11000 é lançado quando há valor duplicado, dado à restrição de unicidade de um atributo,
    // ou seja, já possui um admin cadastrado com o mesmo email.
    // Caso contrário, houve um outro erro ao salvar um novo admin.
    if(err.code !== 11000)
        process.exit(1);
}


