const Validator = require('validator');

module.exports = (data) => {
  data.email = data.email ? data.email : '';
  data.password = data.password ? data.password : '';

  let errors = {};


  if(!Validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email!'
  }
  
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Please enter your email';
  }
  
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Please enter your password!';
  }

  return errors;
};