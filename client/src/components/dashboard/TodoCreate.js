import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, getTodos } from '../../actions/todoActions';

class TodoCreate extends Component {
  state = {
    text: '',
    completed: '',
    startDate: Date.now(),
    deadline: null
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      text: this.state.text,
      completed: this.state === 'on' ? true : false,
      createdAt: this.state.startDate,
      deadline: this.state.deadline
    }
    console.log(newTodo);
    this.props.addTodo(newTodo);
    this.props.getTodos();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="col-lg-8 col-md-10 mx-auto bg-light p-3">
        <input 
          type="text"
          className="form-control"
          placeholder="Add a todo..."
          name="text"
          onChange={this.onChange}
        />

        <div className="d-flex flex-wrap">
          <div className="form-group">
            <label htmlFor="startDate"><strong>Start Date</strong></label>
            <input 
              type="date"
              className="form-control"
              name="startDate"
              id="startDate"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline"><strong>Deadline</strong></label>
            <input 
              type="date"
              className="form-control"
              id="deadline"
              name="deadline"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <label htmlFor="completed"><strong>Completed</strong></label>
            <input 
              type="checkbox"
              className="mt-3"
              id="completed"
              name="completed"
              onChange={this.onChange}
            />
          </div>

          <input type="submit" value="Submit" className="btn btn-large btn-info ml-auto mt-3 align-self-center"/>
      
        </div>

      </form>
    )
  }
}

export default connect(null, { addTodo, getTodos })(TodoCreate);