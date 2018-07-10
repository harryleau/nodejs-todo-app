import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../../actions/todoActions';
import ReactLoading from 'react-loading';

import TodoList from './TodoList';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import TodoCreate from './TodoCreate';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTodos();

    if(!this.props.auth.isAuth) {
      this.props.history.push('/login');
    }
  }

  // componentWillReceiveProps(next)

  render() {
    const { todos, loading } = this.props.todo;
    
    let todoList;

    if(loading) {
      todoList = <ReactLoading className="mx-auto" type="bubbles" color="#333" height={100} width={100} />
    } else if(!loading && todos) {
      todoList = <TodoList todos={todos} />
    } else {
      todoList = <div>There is no todos at the moment.</div>
    }

    return (
      <div className="text-center my-5">
        
        <TodoCreate />
        <div className="my-5">
          <h1 className="text-dark">Your Todo List</h1>
          <TodoFilters />
          {todoList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todo: state.todo,
  auth: state.auth,
});

export default connect(mapStateToProps, { getTodos })(Dashboard);
