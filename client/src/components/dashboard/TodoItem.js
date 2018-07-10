import React, { Component } from 'react';
import { connect } from 'react-redux'; 

class TodoItem extends Component {
  state = {
    completed: this.props.todo.completed
  };

  render() {
    const { todo } = this.props;
 
    return (
      <tr>
        <td><strong>{todo.text}</strong></td>
        <td>{todo.deadline}</td>
        <td>{todo.createdAt}</td>
        <td><strong><i className={todo.completed ? "fa fa-check" : ""}></i>{!todo.completed && 'No'}</strong></td>
        <td><i className="fa fa-edit"></i></td>
        <td>X</td>
      </tr>
    )
  }
}

export default connect()(TodoItem);