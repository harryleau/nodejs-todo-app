import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactDateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import { setText, setStartDate, setEndDate, sortByStartDate, sortByDeadline, showCompleted } from '../../actions/filtersAction';

class TodoFilters extends Component {

  onTextFilter = (e) => {
    this.props.setText(e.target.value);
  };

  onStartDateFilter = (startDate) => {
    this.props.setStartDate(startDate);
  };

  onEndDateFilter = (endDate) => {
    this.props.setEndDate(endDate);
  };

  onCheck = (e) => {
    this.props.showCompleted();
  };

  onSelectChange = (e) => {
    if(e.target.value === 'deadline') this.props.sortByDeadline();
    else if(e.target.value === 'startDate') this.props.sortByStartDate(); 
  };

  render() {
    const { text, startDate, endDate, sortBy, showCompleted } = this.props.filters;

    return (
      <form className="row mx-auto">
        <input 
          type="text"
          placeholder="Search for todos..."
          className="form-control col-md-5 mb-3 mx-auto"
          value={text}
          onChange={this.onTextFilter}
        />  

        <ReactDateTime 
          inputProps={{ placeholder: 'From Date', className: "form-control" }}
          className="col-md-3 col-sm-6 mb-3 mx-auto"
          dateFormat="DD-MM-YYYY"
          timeFormat="H:mm"
          value={startDate}
          onChange={this.onStartDateFilter}
        />

        <ReactDateTime
          inputProps={{ placeholder: 'To Date', className: "form-control" }}
          className="col-md-3 col-sm-6 mb-3 mx-auto"
          dateFormat="DD-MM-YYYY"
          timeFormat="H:mm"
          value={endDate}
          onChange={this.onEndDateFilter}
        />

        <div className="col-md-4 col-sm-6 mr-auto">
          <label htmlFor="showCompletedFilter" className="pr-2">Show Completed Todos</label>
          <input 
            type="checkbox"
            id="showCompletedFilter"
            onChange={this.onCheck}
            checked={showCompleted}
          />
        </div>

        <select 
          className="form-control col-md-3 col-sm-4 ml-auto mb-2"
          onChange={this.onSelectChange}
          value={sortBy}
        >
          <option value="deadline">Sort By Deadline</option>
          <option value="startDate">Sort By Start Date</option>
        </select>

      </form>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
}); 

export default connect(mapStateToProps, { 
  setText, setEndDate, setStartDate, sortByDeadline, sortByStartDate, showCompleted
})(TodoFilters);
