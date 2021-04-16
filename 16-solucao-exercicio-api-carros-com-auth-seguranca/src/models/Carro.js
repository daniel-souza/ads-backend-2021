import mongoose from 'mongoose';

const Carro = new mongoose.Schema(
{
    modelo: {
        type: String,
        required: true
    },
    fabricante: {
        type: String,
        required: true
    },
    data_fabricacao: {
        type: Date, // "YYYY-MM-DD"
        required: true
    },
    preco: {
        type: Number,
        required: false
    }
}, {
        timestamps: true // createAt updateAt
});

export default mongoose.model('carro', Carro);