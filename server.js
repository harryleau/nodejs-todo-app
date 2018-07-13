const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// load db
require('./db/mongoose');

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routes
const todosRoute = require('./routes/todos');
const usersRoute = require('./routes/users');

// use Routes
app.use('/api/todos', todosRoute);
app.use('/api/users', usersRoute);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/public'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('server is up on port', port);
});