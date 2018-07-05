const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// load db
require('./db/mongoose');

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routes
const todosRoute = require('./routes/todos');
const usersRoute = require('./routes/users');

app.get('/', (req, res) => {
  res.send('hello');
});

// use Routes
app.use('/todos', todosRoute);
app.use('/users', usersRoute);


const port = 5000;

app.listen(port, () => {
  console.log('server is up on port', port);
});