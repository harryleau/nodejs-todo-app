const express = require('express');
const _ = require('lodash');
const { authenticate } = require('../middleware/authenticate');

// load input validation
const validateRegisterInput = require('../validation/registerInput');
const validateLoginInput = require('../validation/loginInput');

const router = express.Router();

// load user model
const { User } = require('../models/User');

// @ROUTE   /api//users/register
// @DESC    register user
// @ACCESS  public
router.post('/register', (req, res) => {
  const body = _.pick(req.body, ['email', 'name', 'password', 'password2']);
  
  const errors = validateRegisterInput(body);

  if(!_.isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({ email: 'This email has already been registered!' });
      }

      const newUser = new User(body);

      return newUser.save().then((user) => res.json(user))
        .catch(e => console.log(e));
    })
});

// @ROUTE   /api/users/login
// @DESC    login user, create token
// @ACCESS  public
router.post('/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  const errors = validateLoginInput(body);

  if(!_.isEmpty(errors)) {
    res.status(400).json(errors);
  }

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.createToken()
        .then(token => res.header('x-auth', token).json(user));
    })
    .catch(e => res.status(400).json({ 'noUser': 'Wrong user or wrong password!' }));
});

// @ROUTE   /api/users/logout
// @DESC    logout user, remove token
// @ACCESS  private
router.delete('/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => res.json({ 'status': 'success' }))
    .catch(e => res.status(400).json(e));
});

// @ROUTE   /api/users/delete
// @DESC    delete user
// @ACCESS  private
router.delete('/', authenticate, (req, res) => {
  User.findByIdAndRemove(req.user._id)
    .then(() => res.json({ 'status': 'success' }))
    .catch(e => res.status(400).json(e));
});

module.exports = router;