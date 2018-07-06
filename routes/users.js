const express = require('express');
const _ = require('lodash');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

// load user model
const { User } = require('../models/User');

// @ROUTE   /users/register
// @DESC    register user
// @ACCESS  public
router.post('/register', (req, res) => {
  const body = _.pick(req.body, ['email', 'name', 'password']);
  const user = new User(body);

  user.save().then((user) => res.json(user))
    .catch(e => res.status(400).send(e));
});

// @ROUTE   /users/login
// @DESC    login user, create token
// @ACCESS  public
router.post('/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.createToken()
        .then(token => res.header('x-auth', token).json(user))
    })
    .catch(e => res.status(400).json({ 'noUser': 'No user was found' }));
});

// @ROUTE   /users/logout
// @DESC    logout user, remove token
// @ACCESS  private
router.delete('/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => res.json({ 'status': 'success' }))
    .catch(e => res.status(400).json(e));
});

// @ROUTE   /users/delete
// @DESC    delete user
// @ACCESS  private
router.delete('/', authenticate, (req, res) => {
  User.findByIdAndRemove(req.user._id)
    .then(() => res.json({ 'status': 'success' }))
    .catch(e => res.status(400).json(e));
});

module.exports = router;