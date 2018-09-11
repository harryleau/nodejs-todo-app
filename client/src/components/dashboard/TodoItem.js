import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { removeTodo, getTodo, setCompleted } from "../../actions/todoActions";

class TodoItem extends Component {
  state = {
    completed: this.props.todo.completed
  };

  onCheck = e => {
    this.setState({
      completed: e.target.checked
    });

    this.props.setCompleted(this.props.todo._id, {
      ...this.props.todo,
      completed: e.target.checked
    });
  };

  render() {
    const { todo } = this.props;

    let startDate = moment(todo.createdAt).format("ddd, DD MMM YYYY - H:mm");
    startDate = startDate === "Invalid date" ? "Not set" : startDate;

    let deadline = moment(todo.deadline).format("ddd, DD MMM YYYY - H:mm");
    deadline = deadline === "Invalid date" ? "Not set" : deadline;

    return (
      <tr>
        <td>
          <strong>
            {this.state.completed ? <del>{todo.text}</del> : todo.text}
          </strong>
        </td>
        <td>{this.state.completed ? <del>{startDate}</del> : startDate}</td>
        <td>{this.state.completed ? <del>{deadline}</del> : deadline}</td>
        <td>
          <input
            type="checkbox"
            onChange={this.onCheck}
            checked={this.state.completed}
          />
        </td>

        <td>
          <button
            className="task-btn"
            onClick={() => {
              this.props.getTodo(todo._id);
            }}
          >
            <strong className="text-white" style={{ fontWeight: 600 }}>
              edit
            </strong>
          </button>
        </td>

        <td>
          <button
            className="task-btn text-danger"
            onClick={() => {
              this.props.removeTodo(todo._id);
            }}
          >
            remove
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(
  null,
  { removeTodo, getTodo, setCompleted }
)(TodoItem);
