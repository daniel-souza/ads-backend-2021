import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true,
        enum: ['F', 'M']
    },
    data_nasc: Date,
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true,
        minLength: 6
    },
    produtos: [{
        nome: {
            type: String,
            required: true
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
                required: true
            },
            usuario: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario'
            }
      }]
    }]
})

export default mongoose.model('Usuario', UsuarioSchema);
