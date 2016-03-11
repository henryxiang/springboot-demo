import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Input} from 'react-bootstrap';
import {updateSchedule, fetchSchedule} from '../store/actions';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from './DatePicker.jsx';

class ScheduleHeader extends Component {

  render() {
    const {currentIndex, schedules} = this.props;
    const workingCopy = schedules[currentIndex];
    const header = workingCopy.isNew ? this.renderNewWorkScheduleHeader() : this.renderExistingWorkScheduleHeader();
    return header;
  }

  componentDidUpdate() {
    const workingCopy = this.getWorkingCopy(); 
    let scheduleStartDate = ReactDOM.findDOMNode(this.refs.startDate);
    let scheduleEndDate = ReactDOM.findDOMNode(this.refs.endDate);
    scheduleStartDate.value = moment(workingCopy.startDate).format('MM/DD/YYYY');
    scheduleEndDate.value = moment(workingCopy.endDate).format('MM/DD/YYYY');
  }

  renderNewWorkScheduleHeader() {
    const {currentIndex, schedules} = this.props;
    const workingCopy = schedules[currentIndex];
    return (
      <div>
        <Row>
          <Col md={4}>
          	<b>Employee Name: </b>
          	{this.renderEmployeeNameSelection(workingCopy.employee.name, 'employee')}
          </Col>
          <Col md={4}>
          	<b>Job Title: </b>
          	{this.renderJobTitleSelection(workingCopy.jobTitle, 'jobTitle')}
          </Col>
        </Row>
        <Row>
          <Col md={4}>
          	<b>Schedule From: </b>
          	{this.renderScheduleDatePicker(workingCopy.startDate, 'startDate')}
          </Col>
          <Col md={4}>
          	<b>To: </b>
          	{this.renderScheduleDatePicker(workingCopy.endDate, 'endDate')}
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            {this.renderScheduleType(workingCopy.type, 'type')}
          </Col>
        </Row>
        <Row>
        	<Col md={3}>
          	<b>Recurring Schedule: </b>
          	{this.renderIsRecurring(workingCopy.isRecurring, 'isRecurring')}
          </Col>
        </Row>
        <br/>
      </div>
    )  
  }

  renderExistingWorkScheduleHeader() {
    const {currentIndex, schedules} = this.props;
    const workingCopy = schedules[currentIndex];
    return (
      <div>
      	<Row>
          <Col md={4}>
            <b>Employee ID: </b>
            {workingCopy.employee.id}
          </Col>
        </Row>
        <Row>
          <Col md={4}>
          	<b>Employee Name: </b>
          	{workingCopy.employee.name}
          </Col>
          <Col md={4}>
          	<b>Job Title: </b>
          	{workingCopy.jobTitle}
          </Col>
        </Row>
        <Row>
          <Col md={4}>
          	<b>Schedule From: </b>
          	{this.renderScheduleDatePicker(workingCopy.startDate, "startDate")}
          </Col>
          <Col md={4}>
          	<b>To: </b>
          	{this.renderScheduleDatePicker(workingCopy.endDate, 'endDate')}
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            {this.renderScheduleType(workingCopy.type, 'type')}
          </Col>
        </Row>
        <Row>
        	<Col md={3}>
          	<b>Recurring Schedule: </b>
          	{this.renderIsRecurring(workingCopy.isRecurring, 'isRecurring')}
          </Col>
        </Row>
        <br/>
      </div>
    )  
  };

  renderScheduleDatePicker(value, id) {
  	return (
	  	<DatePicker ref={id} defaultDate={value} onChange={this.handleDateChange.bind(this, id)} />
	  );
  }

  renderScheduleType(value, id) {
    const scheduleTypes = [
      'Regular', 
      'On-Call (restricted)', 
      'On-Call (unrestricted)',
      'On-Call (skilled craft)',
      'Temporary Assignment'
    ];
    return (
      <Input bsSize="small" label="Schedule Type:" type="select" defaultValue={value} id={id} onChange={this.handleValueChange.bind(this)}>
        {
          scheduleTypes.map((v, i) => {
            return (
              <option key={i} value={v}>{v}</option>
            )
          })
        }
      </Input>
    );
  }

  renderEmployeeNameSelection(value, id) {
    const {schedules} = this.props;
    const names = _.uniq(schedules.map(s => s.employee.name)).sort();
    return (
      <Input bsSize="small" type="select" defaultValue={value} id={id} onChange={this.handleValueChange.bind(this)}>
        {
          names.map((v, i) => {
            return (
              <option key={i} value={v}>{v}</option>
            )
          })
        }
      </Input>
    );
  }

  renderJobTitleSelection(value, id) {
    const workingCopy = this.getWorkingCopy();
    const employeeJobs = workingCopy.employee.jobs;
    return (
      <Input bsSize="small" type="select" defaultValue={value} id={id} onChange={this.handleValueChange.bind(this)}>
        {
          employeeJobs.map((v, i) => {
            return (
              <option key={i} value={v}>{v}</option>
            )
          })
        }
      </Input>
    );
  }

  renderIsRecurring(value, id) {
    return <input type="checkbox" defaultChecked={value} id={id} onChange={this.handleValueChange.bind(this)} />;
  }

  handleValueChange(e) {
    const {dispatch, schedules, currentIndex} = this.props;
    //const [attr1, attr2] = e.target.id.split('-');
    const attr = e.target.id;
    const val = e.target.value;
    var workingCopy = this.getWorkingCopy();
    if (attr === 'employee') {
      let employeeSchedule = _.find(schedules, (s) => (s.employee.name === val));  
      workingCopy.employee = _.cloneDeep(employeeSchedule.employee);
      //if (workingCopy.jobTitle === '') {
        workingCopy.jobTitle = workingCopy.employee.jobs[0];
      //}
    } else {
      workingCopy[attr] = val;
    }

    workingCopy.saved = false;

    //console.log(`${attr} = ${val}`);

    dispatch(updateSchedule(currentIndex, workingCopy));
    //dispatch(fetchSchedule(currentIndex));
  }

  handleDateChange(id, dateTimeValue, dateTimeString) {
    const {dispatch, currentIndex} = this.props;
    const key = id;
    var workingCopy = this.getWorkingCopy();
    workingCopy[key] = dateTimeValue;
    workingCopy.saved = false;

    //console.log(`${key} = ${workingCopy[key]}`);

    dispatch(updateSchedule(currentIndex, workingCopy));
  }

  getWorkingCopy() {
    const {currentIndex, schedules} = this.props;
    return _.cloneDeep(schedules[currentIndex]);
  }

}

export default connect(state => state)(ScheduleHeader)