const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/keys');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// override toJSON method
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();

  return _.pick(userObj, ['_id', 'email', 'name']);
}

UserSchema.methods.createToken = function() {
  const user = this;
  const access = 'auth';
  const payload = {
    access,
    _id: user._id,
    name: user.name,
    email: user.email
  };

  const token = jwt.sign(payload, secret).toString();

  user.tokens.push({ access, token });

  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch(e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: payload._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.methods.removeToken = function(token) {
  const user = this;

  return user.update({
    $pull: { tokens: { token } }
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  return User.findOne({ email })
    .then(user => {
      if(!user) {
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if(res) resolve(user);
          else reject();
        });
      });
    });
};

UserSchema.pre('save', function(next) {
  const user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };