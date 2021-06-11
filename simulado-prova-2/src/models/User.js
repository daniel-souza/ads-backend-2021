import mongoose from 'mongoose';

const User = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  sexo: String, // ou { type: String, required: false }
  email:{
    type: String,
    required: true
  }, 
  senha: {
    type: String,
    required: true
  },
  posts: [{
    titulo: {
      type: String,
      required: true
    },
    conteudo: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true,
});

export default mongoose.model('user', User);