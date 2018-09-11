import React, { Component } from "react";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import { getTodosByFilters, getTodos } from "../../actions/todoActions";

class TodoList extends Component {
  render() {
    const { filteredTodos } = this.props;

    return (
      <div className="table-responsive">
        <table className="mx-auto table p-0 text-white">
          <thead className="text-gold">
            <tr>
              <th>Task</th>
              <th>Start Date</th>
              <th>Deadline</th>
              <th>Completed</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map(todo => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  filteredTodos: getTodosByFilters(props.todos, state.filters)
});

export default connect(
  mapStateToProps,
  { getTodos }
)(TodoList);
