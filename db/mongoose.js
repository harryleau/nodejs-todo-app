const mongoose = require('mongoose');
const { mongoURI, secret } = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI)
  .then(() => console.log('mongoDB connected!'))
  .catch(e => console.logo(e));

module.exports = { mongoose };