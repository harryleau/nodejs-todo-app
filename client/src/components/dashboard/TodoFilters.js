import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReactDateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import {
  setText,
  setStartDate,
  setEndDate,
  sortByStartDate,
  sortByDeadline,
  showCompleted
} from "../../actions/filtersAction";

class TodoFilters extends Component {
  onTextFilter = e => {
    this.props.setText(e.target.value);
  };

  onStartDateFilter = startDate => {
    this.props.setStartDate(startDate);
  };

  onEndDateFilter = endDate => {
    this.props.setEndDate(endDate);
  };

  onCheck = e => {
    this.props.showCompleted();
  };

  onSelectChange = e => {
    if (e.target.value === "deadline") this.props.sortByDeadline();
    else if (e.target.value === "startDate") this.props.sortByStartDate();
  };

  render() {
    const {
      text,
      startDate,
      endDate,
      sortBy,
      showCompleted
    } = this.props.filters;

    return (
      <form className="mx-auto filters">
        <div className="row mx-auto">
          <input
            type="text"
            placeholder="Search for tasks..."
            className="form-control col-md-5 mb-3 mx-auto col-sm-11"
            value={text}
            onChange={this.onTextFilter}
          />

          <div className="col-md-7 d-flex mb-3 mx-auto">
            <ReactDateTime
              inputProps={{
                placeholder: "From Date",
                className: "form-control"
              }}
              className=""
              dateFormat="DD-MM-YYYY"
              timeFormat="H:mm"
              value={startDate}
              onChange={this.onStartDateFilter}
            />

            <ReactDateTime
              inputProps={{ placeholder: "To Date", className: "form-control" }}
              className=""
              dateFormat="DD-MM-YYYY"
              timeFormat="H:mm"
              value={endDate}
              onChange={this.onEndDateFilter}
            />
          </div>
        </div>

        <div className="col-md-10 d-flex flex-wrap mx-auto mb-3">
          <div className="pull-left">
            <label htmlFor="showCompletedFilter" className="mr-2 text-white">
              Show Completed Tasks
            </label>
            <input
              type="checkbox"
              id="showCompletedFilter"
              onChange={this.onCheck}
              checked={showCompleted}
              className="ml-2"
            />
          </div>

          <select
            className="ml-auto"
            onChange={this.onSelectChange}
            value={sortBy}
          >
            <option value="deadline">Sort By Deadline</option>
            <option value="startDate">Sort By Start Date</option>
          </select>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(
  mapStateToProps,
  {
    setText,
    setEndDate,
    setStartDate,
    sortByDeadline,
    sortByStartDate,
    showCompleted
  }
)(TodoFilters);
