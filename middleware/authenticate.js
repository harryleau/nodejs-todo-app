const { User } = require('../models/User');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  return User.findByToken(token)
    .then(user => {
      if(!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;

      next();
    })
    .catch(e => res.status(401).send({ error: 'Not authorized' }));
};

module.exports = { authenticate };