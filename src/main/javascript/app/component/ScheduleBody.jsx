import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, ButtonToolbar, DropdownButton, MenuItem, Input, Glyphicon, Panel, Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import {updateSchedule, saveSchedule, deleteSchedule, fetchSchedule} from '../store/actions';

class ScheduleBody extends Component {

  render() {
    const workingCopy = this.getWorkingCopy();
    const entries = _.sortBy(workingCopy.recurring, ['week', 'weekday', 'startTime']);
    return (
      <div>
        {this.renderToolBar(entries, workingCopy)}

        <Panel header="Schedule Entries">
          {entries.length > 0 ? this.renderHeader() : ''}
          {this.renderEntries(entries)}
          {this.renderTotalHours(entries)}
        </Panel>

      </div>
    );
  }

  renderAddScheduleDropdownButton() {
  	const scheduleTmplates = ['Regular', '4/40 Schedule', '9/80 Schedule'];
    return (
      <DropdownButton bsStyle="primary" id="schedule-template" title="Apply Template" onSelect={this.handleAddSchedule.bind(this)}>
      {
      	scheduleTmplates.map((template, index) => (<MenuItem id={index} key={index} eventKey={index}>{template}</MenuItem>))
      }
      </DropdownButton>
    )
  }

  renderAddEntryDropdownButton() {
  	const entryTypes = ['Regular', 'Day Shift', 'Evening Shift', 'Night Shift']
    return (
      <DropdownButton bsStyle="primary" id="add-schedule-entry" title="Add Entry" onSelect={this.handleAddNewEntry.bind(this)}>
      {
      	entryTypes.map((type, index) => (<MenuItem id={index} key={index} eventKey={index}>{type}</MenuItem>))
      }
      </DropdownButton>
    )
  }

  renderToolBar(entries, workingCopy) {
    return (
      <ButtonToolbar>
        {this.renderAddScheduleDropdownButton()}
        {this.renderAddEntryDropdownButton()}
        <Button bsStyle="primary" onClick={this.handleCopyLast.bind(this)} disabled={entries.length <= 0}>Copy Last</Button>
        <Button bsStyle="primary" onClick={this.handleClearAll.bind(this)} disabled={entries.length <= 0}>Clear All</Button>
        <Button bsStyle="primary" onClick={this.handleSave.bind(this)} disabled={workingCopy.saved}>Save</Button>
        <Button bsStyle="danger" onClick={this.handleDeleteSchedule.bind(this)}>Delete</Button>
      </ButtonToolbar>
    )
  }

  renderHeader() {
    return (
      <Row>
        <Col md={1}>Week</Col>
        <Col md={2}>Weekday</Col>
        <Col md={2}>Start Time</Col>
        <Col md={2}>End Time</Col>
        <Col md={2}>Break(min)</Col>
        <Col md={1}>Hours</Col>
        <Col md={1}>Delete</Col>
      </Row>
    )
  }

  renderEntries(entries) {
    if (entries !== null && entries.length > 0) {
      const entryList = entries.map((entry, index) => {
        const {id, week, weekday, startTime, endTime, breakTime, type} = entry;
        return (
          <Row key={id}>
            <Col md={1}>{this.renderEntryWeek(week, `recurring-${index}-week`)}</Col>
            <Col md={2}>{this.renderEntryWeekday(weekday, `recurring-${index}-weekday`)}</Col>
            <Col md={2}>{this.renderEntryTime(startTime, `recurring-${index}-startTime`)}</Col>
            <Col md={2}>{this.renderEntryTime(endTime, `recurring-${index}-endTime`)}</Col>
            <Col md={2}>{this.renderEntryBreakTime(breakTime, `recurring-${index}-breakTime`)}</Col>
            <Col md={1}>{this.getEntryHours(entry).toFixed(2)}</Col>
            <Col md={1}><Button bsStyle="link" bsSize="xsmall" onClick={this.handleDeleteEntry.bind(this,index)}><Glyphicon glyph="remove"/></Button></Col>
          </Row>
        );
      });
      return entryList;
    }
    else {
      return (
        <Row><Col md={12}>No schedule entries found</Col></Row>
      )
    }
  }

  renderSummary(entries) {
    var summary = {};
    for (var i = 0; i < entries.length; i++) {
      let entryHours = this.getEntryHours(entries[i])
      let entryType = entries[i].type;
      if (entryType in summary) {
        summary[entryType] += entryHours;
      } 
      else {
        summary[entryType] = entryHours;
      }
    }
    return (
      <div>
        {
          _.keys(summary).map(k => (
            <span key={k}><b>{k}:</b> {summary[k]} hrs; </span>
          ))
        }
      </div>
    )
  }

  renderTotalHours(entries) {
    let totalHours = 0;
    for (var i = 0; i < entries.length; i++) {
      totalHours += this.getEntryHours(entries[i])
    }
    return (
      <div><b>Total Hours: </b>{totalHours.toFixed(2)}</div>
    )
  }

  renderEntryWeek(value, id) {
    const weekNum = [1, 2, ''];
    return (
      <Input bsSize="small" type="select" defaultValue={value} id={id} onChange={this.handleValueChange.bind(this)}>
        {
          weekNum.map((v, i) => {
            return (
              <option key={i} value={v}>{v}</option>
            )
          })
        }
      </Input>
    );
  }

  renderEntryWeekday(value, id) {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
      <Input bsSize="small" type="select" defaultValue={value} id={id} onChange={this.handleValueChange.bind(this)}>
        {
          weekDays.map((v, i) => {
            return (
              <option key={i} value={i}>{v}</option>
            )  
          })
        }
      </Input>
    );
  }

  renderEntryTime(value, id) {
    const AM_PM = ['AM', 'PM'],
          HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          MINUTES = ['00', '15', '30', '45'];
    var entryTimes = [];

    for (var i = 0; i < AM_PM.length; i++) {
      for (var j = 0; j < HOURS.length; j++) {
        for (var k = 0; k < MINUTES.length; k++) {
          var t = HOURS[j] + ":" + MINUTES[k] + ' ' + AM_PM[i];
          entryTimes.push(t);
        }
      }
    }

    return (
      <Input bsSize="small" type="select" defaultValue={value}  id={id} onChange={this.handleValueChange.bind(this)}>
        {
          entryTimes.map((v, i) => {
            return (
              <option key={i} value={v}>{v}</option>
            )  
          })
        }
      </Input>
    );
  }

  renderEntryBreakTime(value, id) {
    const breakTimes = [0, 15, 30, 45, 60]
    return (
      <Input bsSize="small" type="select" defaultValue={value} id={id} onChange={this.handleValueChange.bind(this)}>
        {
          breakTimes.map((v, i) => {
            return (
              <option key={i} value={v}>{v}</option>
            )        
          })
        }
      </Input>
    );
  }

  // renderEntryType(value, id) {
  //   const entryTypes = ['Regular', 'On-Call'];
  //   return (
  //     <Input bsSize="small" type="select" defaultValue={value} id={id} onChange={this.handleValueChange.bind(this)}>
  //       {
  //         entryTypes.map((v, i) => {
  //           return (
  //             <option key={i} value={v}>{v}</option>
  //           )
  //         })
  //       }
  //     </Input>
  //   );
  // }

  handleAddNew() {
    const {dispatch, currentIndex} = this.props;
    var workingCopy = this.getWorkingCopy();
    var newEntry = {id: _.uniqueId(), week: '', weekday: 7, startTime: '8:00 AM', endTime: '5:00 PM', breakTime: 60, type: 'Regular'};

    workingCopy.recurring.push(newEntry);
    workingCopy.saved = false;

    // console.log("Entry:\n");
    // console.log(newEntry);
    // console.log("Schedule:\n");
    // console.log(workingCopy);

    dispatch(updateSchedule(currentIndex, workingCopy));
  }

  handleCopyLast() {
    const {dispatch, currentIndex} = this.props;
    var workingCopy = this.getWorkingCopy();
    var newEntry;
    if (workingCopy.recurring !== null && workingCopy.recurring.length > 0) {
      newEntry = _.clone(_.last(workingCopy.recurring));
      newEntry.id = _.uniqueId();
      newEntry.weekday = (newEntry.weekday + 1) % 7;
      if (newEntry.weekday < _.last(workingCopy.recurring).weekday) {
        newEntry.week += 1;
      }
    }
    else {
      newEntry = {id: _.uniqueId(), week: 1, weekday: 1, startTime: '8:00 AM', endTime: '5:00 PM', breakTime: 60, type: 'Regular'};
    }
    workingCopy.recurring.push(newEntry);
    workingCopy.saved = false;

    // console.log("Entry:\n");
    // console.log(newEntry);
    // console.log("Schedule:\n");
    // console.log(workingCopy);

    dispatch(updateSchedule(currentIndex, workingCopy));
  }

  handleDeleteEntry(entryIndex) {
    const {dispatch, currentIndex} = this.props;
    var workingCopy = this.getWorkingCopy();

    // console.log("Deleting:\n");
    // console.log(workingCopy.recurring[entryIndex]);

    workingCopy.recurring.splice(entryIndex, 1);
    workingCopy.saved = false;

    // console.log("Entries:\n");
    // for (var i = 0; i < workingCopy.recurring.length; i++) {
    //   console.log(workingCopy.recurring[i]);
    // }

    dispatch(updateSchedule(currentIndex, workingCopy));
  }

  handleSave(e) {
    const {dispatch, currentIndex} = this.props;
    var workingCopy = this.getWorkingCopy();
    workingCopy.isNew = false;
    workingCopy.saved = true;

    dispatch(updateSchedule(currentIndex, workingCopy));
  }

  handleValueChange(e) {
    const {dispatch, currentIndex} = this.props;
    const [entryType, entryIndex, key] = e.target.id.split('-');
    var workingCopy = this.getWorkingCopy();
    workingCopy[entryType][entryIndex][key] = e.target.value;
    workingCopy.saved = false;

    // console.log("Entry:\n");
    // console.log(workingCopy[entryType][entryIndex]);

    dispatch(updateSchedule(currentIndex, workingCopy));
  }

  handleAddSchedule(event) {
    const {dispatch, currentIndex} = this.props;
    var workingCopy = this.getWorkingCopy();
    var entryId, entry;

    switch (parseInt(event.target.id)) {
    	case 0:
        for (var i = 1; i <= 5; i++) {
          entryId = _.uniqueId();
          entry = {id: entryId, week: 1, weekday: i, startTime: '8:00 AM', endTime: '5:00 PM', breakTime: 60, type: 'Regular'};
          workingCopy.recurring.push(entry);
        }
        break;
      case 1:
        for (var i = 1; i <= 4; i++) {
          entryId = _.uniqueId();
          entry = {id: entryId, week: 1, weekday: i, startTime: '8:00 AM', endTime: '6:30 PM', breakTime: 30, type: 'Regular'};
          workingCopy.recurring.push(entry);
        }
        break;
      case 2:
        for (var i = 1; i <= 4; i++) {
          entryId = _.uniqueId();
          entry = {id: entryId, week: 1, weekday: i, startTime: '8:00 AM', endTime: '5:30 PM', breakTime: 30, type: 'Regular'};
          workingCopy.recurring.push(entry);
          entryId = _.uniqueId();
          entry = {id: entryId, week: 2, weekday: i, startTime: '8:00 AM', endTime: '5:30 PM', breakTime: 30, type: 'Regular'};
          workingCopy.recurring.push(entry);
        }
        entryId = _.uniqueId();
        entry = {id: entryId, week: 1, weekday: 5, startTime: '8:00 AM', endTime: '4:30 PM', breakTime: 30, type: 'Regular'};
        workingCopy.recurring.push(entry);
        break;
      default:
        console.log("schedule template not defined");
        break;
    }

    workingCopy.saved = false;

    dispatch(updateSchedule(currentIndex, workingCopy));
  }

  handleAddNewEntry(event) {
    const {dispatch, currentIndex} = this.props;
    const scheduleId = event.target.id;
    var workingCopy = this.getWorkingCopy();

    const entryTypes = [
      {id: null, week: 1, weekday: 1, startTime: '8:00 AM', endTime: '5:00 PM', breakTime: 60, type: 'Regular'}, 
      {id: null, week: 1, weekday: 1, startTime: '8:00 AM', endTime: '4:30 PM', breakTime: 30, type:  'Day Shift'}, 
      {id: null, week: 1, weekday: 1, startTime: '4:00 PM', endTime: '12:30 AM', breakTime: 30, type:  'Evening Shift'}, 
      {id: null, week: 1, weekday: 1, startTime: '12:00 AM', endTime: '8:30 AM', breakTime: 30, type:  'Night Shift'}
    ];

    var newEntry = _.clone(entryTypes[event.target.id]);
    newEntry.id = _.uniqueId();

    if (workingCopy.recurring !== null && workingCopy.recurring.length > 0) {
      newEntry.weekday = (_.last(workingCopy.recurring).weekday + 1) % 7;
      if (newEntry.weekday < _.last(workingCopy.recurring).weekday) {
        newEntry.week = _.last(workingCopy.recurring).week + 1;
      }
      else {
        newEntry.week = _.last(workingCopy.recurring).week;  
      }
    }

    workingCopy.recurring.push(newEntry);
    workingCopy.saved = false;

    dispatch(updateSchedule(currentIndex, workingCopy));    
  }

  handleClearAll() {
    const {dispatch, currentIndex} = this.props;
    var workingCopy = this.getWorkingCopy();

    workingCopy.recurring = [];
    workingCopy.saved = false;

    dispatch(updateSchedule(currentIndex, workingCopy));
  }

  handleDeleteSchedule() {
  	const {dispatch, schedules, currentIndex} = this.props;
  	const msg = "The schedule will be deleted. Proceed?"
  	const workingCopy = this.getWorkingCopy();
  	const nextIndex = _.findIndex(schedules, (s) => (s.employee.name == workingCopy.employee.name));
  	if (confirm(msg)) {
  		//console.log(`Delete schedule: ${currentIndex}`);
  		dispatch(deleteSchedule(currentIndex));
  		dispatch(fetchSchedule(nextIndex));
  	}

  }

  getWorkingCopy() {
    const {currentIndex, schedules} = this.props;
    return _.cloneDeep(schedules[currentIndex]);
  }

  getEntryHours(entry) {
    const {startTime, endTime, breakTime} = entry;
    let time1 = moment(`2000-01-01 ${startTime}`, 'YYYY-MM-DD h:m A'),
      time2 = moment(`2000-01-01 ${endTime}`, 'YYYY-MM-DD h:m A');
    if (time2.isBefore(time1)) {
      time2.add(1, 'd');
    }
    const hours = (time2.diff(time1, 'minutes') - breakTime) / 60.0;
    return hours;
  }

}

export default connect(state => state)(ScheduleBody);