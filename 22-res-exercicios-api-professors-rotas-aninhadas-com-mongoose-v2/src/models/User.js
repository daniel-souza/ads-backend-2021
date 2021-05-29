//const mongoose from 'mongoose';
import mongoose from 'mongoose';

const User = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  }, 
  senha: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

//module.exports = mongoose.model('user',User);
export default mongoose.model('user', User);