import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodos, setTodos } from "../../actions/todoActions";
import ReactLoading from "react-loading";
import isEmpty from "../../utils/is-empty";

import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";
import TodoCreate from "./TodoCreate";
import TodoEdit from "./TodoEdit";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuth) {
      this.props.history.push("/login");
    }

    this.props.getTodos();
  }

  render() {
    const { todo, todos, loading } = this.props.todo;

    let todoList;

    if (loading) {
      todoList = (
        <ReactLoading
          className="mx-auto"
          type="bubbles"
          color="#333"
          height={100}
          width={100}
        />
      );
    } else if (!loading && !isEmpty(todos)) {
      todoList = <TodoList todos={todos} />;
    } else {
      todoList = (
        <div className="mt-5">
          <h6>There is no tasks at the moment.</h6>
        </div>
      );
    }

    return (
      <div className="text-center my-5">
        {isEmpty(todo) ? <TodoCreate /> : <TodoEdit todo={todo} />}
        <div className="my-5 table-container todo-table p-4">
          <h1 className="text-white mb-3">Your Tasks List</h1>
          <hr />
          {!isEmpty(todos) && <TodoFilters />}
          {todoList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todo: state.todo,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getTodos, setTodos }
)(Dashboard);
