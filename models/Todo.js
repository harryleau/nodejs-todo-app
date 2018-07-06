const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo };