import React, { Component } from "react";
import { connect } from "react-redux";
import { editTodo, getTodos, clearTodo } from "../../actions/todoActions";
import ReactDateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import classnames from "classnames";

class TodoEdit extends Component {
  state = {
    text: this.props.todo.text,
    startDate: this.props.todo.createdAt,
    deadline: this.props.todo.deadline,
    errors: {
      startDate: "",
      text: "",
      deadline: ""
    }
  };

  componentDidMount() {
    document.getElementById("text").focus();
  }

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
        text: e.target.value ? "" : "Please fill in this field!"
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

  onSave = e => {
    e.preventDefault();

    const editedTodo = {
      text: this.state.text,
      createdAt: this.state.startDate,
      deadline: this.state.deadline,
      completed: this.props.todo.completed
    };

    if (
      !this.state.errors.text &&
      !this.state.errors.startDate &&
      !this.state.errors.deadline
    ) {
      this.props.editTodo(this.props.todo._id, editedTodo);
      this.props.getTodos();
    }
  };

  onCancel = () => {
    this.props.clearTodo();
  };

  render() {
    const { errors, text, startDate, deadline } = this.state;

    return (
      <form
        onSubmit={this.onSave}
        className="col-lg-8 col-md-10 mx-auto p-3 todo-edit"
      >
        <h3 className="text-gold mb-3">Edit Task</h3>
        <hr />
        <input
          type="text"
          className={classnames("form-control", { "is-invalid": errors.text })}
          value={text}
          name="text"
          id="text"
          onChange={this.onTextChange}
        />
        {errors.text && (
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
              value={moment(startDate).format("DD-MM-YYYY H:mm")}
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
                placeholder: "Not Set",
                className: errors.deadline
                  ? "is-invalid form-control"
                  : "form-control"
              }}
              dateFormat="DD-MM-YYYY"
              timeFormat="H:mm"
              name="deadline"
              id="deadline"
              value={
                moment(deadline).isValid()
                  ? moment(deadline).format("DD-MM-YYYY H:mm")
                  : ""
              }
              onChange={this.onDeadlineChange}
            />
            {errors.deadline && (
              <small className="text-danger">{errors.deadline}</small>
            )}
          </div>
        </div>

        <input type="submit" value="Save" className="btn btn-gold col-sm-6" />
        <button
          type="button"
          onClick={this.onCancel}
          className="btn btn-light col-sm-6"
        >
          Cancel
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editTodo, getTodos, clearTodo }
)(TodoEdit);
