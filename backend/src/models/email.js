const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body:{
    type:String,
    required:true
  },
  subject:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  }
},{timestamps:true});

module.exports = mongoose.model('EmailFlow', emailSchema);