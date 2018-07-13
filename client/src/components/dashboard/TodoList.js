import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { getTodosByFilters, getTodos } from '../../actions/todoActions';

class TodoList extends Component {

  render() {
    const { filteredTodos } = this.props;
    
    return (
      <div className="table-responsive">
        <table className="table bg-light mx-auto table-striped table-condensed p-0">
          <thead className="thead-dark">
            <tr>
              <th>Task</th>
              <th>Start Date</th>
              <th>Deadline</th>
              <th>Completed</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {filteredTodos.map(todo => <TodoItem key={todo._id} todo={todo} />)}

          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  filteredTodos: getTodosByFilters(props.todos, state.filters)
});

export default connect(mapStateToProps, { getTodos })(TodoList);

