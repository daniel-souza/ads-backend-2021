import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
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
    },
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
}, {
    timestamps: true // createdAt updatedAt
})

export default mongoose.model('Usuario', UsuarioSchema);
