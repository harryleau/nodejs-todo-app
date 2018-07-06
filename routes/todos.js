const express = require('express');
const _ = require('lodash');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

// load Todo model
const { Todo } = require('../models/Todo');

// @ROUTE   /todos
// @DESC    post a todo
// @ACCESS  private
router.post('/', authenticate, (req, res) => {
  const body = _.pick(req.body, ['text', 'completed', 'deadline', 'completedAt']);

  if(body.completed) {
    body.completedAt = body.completedAt ? body.completedAt : Date.now();
  } else {
    body.completedAt = null;
  }
  
  const todo = new Todo(body);
  todo.creator = req.user;

  todo.save()
    .then(todo => res.json(todo))
    .catch(e => res.status(400).json(e));
});

// @ROUTE   /todos
// @DESC    get all todos
// @ACCESS  private
router.get('/', authenticate, (req, res) => {
  Todo.find({ creator: req.user })
    .populate('creator')
    .then(todos => {
      if(!todos) {
        return res.json({ 'noTodos': 'No todos' });
      }

      return res.json(todos);
    })
    .catch(e => res.status(400).json(e)); 
});

// @ROUTE   /todos/:id
// @DESC    get todo by id
// @ACCESS  private
router.get('/:id', authenticate, (req, res) => {
  Todo.findOne({ _id: req.params.id, creator: req.user })
    .populate('creator')
    .then(todo => {
      if(!todo) {
        return res.json({ 'noTodo': 'No todo was found' });
      }

      return res.json(todo);
    })
    .catch(e => res.status(400).json({ 'noTodo': 'No todo was found'} )); 
});

// @ROUTE   /todos/:id
// @DESC    update todo by id
// @ACCESS  private
router.put('/:id', authenticate, (req, res) => {
  const update = _.pick(req.body, ['text', 'completed', 'deadline', 'completedAt']);
  
  if(update.completed) {
    update.completedAt = update.completedAt ? update.completedAt : Date.now();
  } else {
    update.completedAt = null;
  }
  
  Todo.findOneAndUpdate({ _id: req.params.id, creator: req.user }, update, { new: true })
    .then(todo => {
      if(!todo) {
        return res.json({ 'noTodo': 'No todo was found' });
      }
      
      return res.json(todo);
    })
    .catch(e => res.status(400).json({ 'noTodo': 'No todo was found'} )); 
});

// @ROUTE   /todos/:id
// @DESC    delete todo by id
// @ACCESS  private
router.delete('/:id', authenticate, (req, res) => {
  Todo.findOneAndRemove({ _id: req.params.id, creator: req.user })
    .then(todo => {
      if(!todo) {
        return res.json({ 'noTodo': 'No todo was found' });
      }
      
      return res.json(todo);
    })
    .catch(e => res.status(400).json({ 'noTodo': 'No todo was found'} )); 
});

router.delete('/', authenticate, (req, res) => {
  Todo.remove({ creator: req.user })
    .then(() => res.json({ 'status': 'success' }))
    .catch(e => res.status(400).json({ 'noTodo': 'No todo was found'} )); 
});

module.exports = router;