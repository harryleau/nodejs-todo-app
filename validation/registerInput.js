const Validator = require('validator');

module.exports = (data) => {
  data.name = data.name ? data.name : '';
  data.email = data.email ? data.email : '';
  data.password = data.password ? data.password : '';
  data.password2 = data.password2 ? data.password2 : '';

  let errors = {};

  if(Validator.isEmpty(data.name)) {
    errors.name = 'Please enter your name!';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email!'
  }
  
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Please enter your email';
  }

  if(!Validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must be at least 6 characters!'
  }
  
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Please choose your password!';
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords do not match!'
  }

  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Please confirm your password!';
  }

  return errors;
};