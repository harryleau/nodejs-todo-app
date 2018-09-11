import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo, getTodos } from "../../actions/todoActions";
import ReactDateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import classnames from "classnames";

class TodoCreate extends Component {
  state = {
    text: "",
    startDate: moment(),
    deadline: null,
    date: "",
    errors: {
      startDate: "",
      text: "not set",
      deadline: ""
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onTextChange = e => {
    this.setState({
      text: e.target.value,
      errors: {
        ...this.state.errors,
        text: e.target.value ? "" : this.props.errors.text
      }
    });
  };

  onStartDateChange = startDate => {
    let startDateError;

    if (moment(startDate).isValid()) startDateError = "";
    else if (startDate === "") startDateError = "You must pick a start date!";
    else startDateError = "Invalid Date!";

    this.setState({
      startDate: startDate,
      errors: {
        ...this.state.errors,
        startDate: startDateError
      }
    });
  };

  onDeadlineChange = deadline => {
    let deadlineError;

    if (moment(deadline).isValid()) deadlineError = "";
    else if (deadline === "") deadlineError = "";
    else deadlineError = "Invalid Date!";

    this.setState({
      deadline: deadline,
      errors: {
        ...this.state.errors,
        deadline: deadlineError
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newTodo = {
      text: this.state.text,
      createdAt: this.state.startDate,
      deadline: this.state.deadline
    };

    if (this.state.errors.text === "not set") {
      this.props.addTodo(newTodo);
    }

    if (
      !this.state.errors.text &&
      !this.state.errors.startDate &&
      !this.state.errors.deadline
    ) {
      this.props.addTodo(newTodo);
    }

    this.setState({
      text: "",
      startDate: moment(),
      deadline: null,
      date: "",
      errors: {
        startDate: "",
        text: "not set",
        deadline: ""
      }
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <form
        onSubmit={this.onSubmit}
        className="col-lg-8 col-md-10 mx-auto p-4 todo-create"
      >
        <h3 className="text-gold mb-3">Create A Task</h3>
        <hr />
        <input
          type="text"
          className={classnames("form-control", {
            "is-invalid": errors.text && errors.text !== "not set"
          })}
          placeholder="Write your task here..."
          name="text"
          onChange={this.onTextChange}
          value={this.state.text}
        />
        {errors.text &&
          errors.text !== "not set" && (
            <small className="invalid-feedback">{errors.text}</small>
          )}

        <div className="row my-3">
          <div className="col-sm-6">
            <label htmlFor="startDate">
              <strong className="text-white">Start Date</strong>
            </label>
            <ReactDateTime
              inputProps={{
                placeholder: "Start Date",
                className: errors.startDate
                  ? "is-invalid form-control"
                  : "form-control"
              }}
              dateFormat="DD-MM-YYYY"
              timeFormat="H:mm"
              name="startDate"
              id="startDate"
              value={this.state.startDate}
              onChange={this.onStartDateChange}
            />
            {errors.startDate && (
              <small className="text-danger">{errors.startDate}</small>
            )}
          </div>

          <div className="col-sm-6">
            <label htmlFor="deadline">
              <strong className="text-white">Deadline</strong>
            </label>
            <ReactDateTime
              inputProps={{
                placeholder: "Not Set (Optional)",
                className: errors.deadline
                  ? "is-invalid form-control"
                  : "form-control"
              }}
              dateFormat="DD-MM-YYYY"
              timeFormat="H:mm"
              name="deadline"
              id="deadline"
              value={this.state.deadline}
              onChange={this.onDeadlineChange}
            />
            {errors.deadline && (
              <small className="text-danger">{errors.deadline}</small>
            )}
          </div>
        </div>

        <input
          type="submit"
          value="Submit"
          className="btn btn-gold btn-block"
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTodo, getTodos }
)(TodoCreate);
