//const mongoose = require('mongoose');
import mongoose from 'mongoose';
//const mongoosePaginate = require('mongoose-paginate-v2')
import mongoosePaginate from 'mongoose-paginate-v2';

const Product = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  marca:{
    type: String,
    required: true
  }, 
  categoria: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

Product.plugin(mongoosePaginate);

//module.exports = mongoose.model('product',Product);
export default mongoose.model('product', Product);