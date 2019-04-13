const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  
  userId: String,
  name : String


});


mongoose.model('User', UsersSchema);