//const mongoose = require('mongoose');
import mongoose from 'mongoose';
//const mongoosePaginate = require('mongoose-paginate-v2')
import mongoosePaginate from 'mongoose-paginate-v2';

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

User.plugin(mongoosePaginate);

//module.exports = mongoose.model('user',User);
export default mongoose.model('user', User);