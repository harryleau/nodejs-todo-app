import React, { Component } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  render() {
    const { todos } = this.props;
    
    return (
      <table className="table table-responsive bg-light table-striped">
        <thead className="thead-dark">
          <tr>
            <th>To do</th>
            <th>Start Date</th>
            <th>Deadline</th>
            <th>Completed</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {todos.map(todo => <TodoItem key={todo._id} todo={todo} />)}

        </tbody>
      </table>
    )
  }
}

