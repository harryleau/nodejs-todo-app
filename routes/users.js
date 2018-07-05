const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const router = express.Router();

// load user model
const { User } = require('../models/User');

router.get('/', (req, res) => {
  res.send('users');
});

router.post('/', (req, res) => {
  const body = _.pick(req.body, ['email', 'name', 'password']);
  const user = new User(body);

  user.save().then((user) => res.json(user))
    .catch(e => res.status(400).send(e));
});

module.exports = router;