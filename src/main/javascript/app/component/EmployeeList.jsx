import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListGroup, ListGroupItem, Label, Glyphicon, Button, Panel, PanelGroup, Badge, Input} from 'react-bootstrap';
import {fetchSchedule, createSchedule, setFilter, resetFilter} from '../store/actions.js';
import _ from 'lodash';
import moment from 'moment';

class EmployeeList extends Component {

	constructor(props) {
		super(props);
		const {schedules, currentIndex} = this.props;
		const scheduleMap = this.getSortedScheduleMap();
		const firstEmployee = scheduleMap.keys().next().value;
		const theIndex = scheduleMap.get(firstEmployee)[0];
		this.state = {
			activeKey: firstEmployee
		};
		this.handleClick(theIndex);
	}

	componentWillReceiveProps(nextProps) {
		const {schedules, currentIndex} = nextProps;	
		this.setState({activeKey: schedules[currentIndex].employee.name});
	}

  render() {
    const {filter} = this.props;
    return(
      <div>
        <Button bsSize="small" bsStyle="primary" onClick={this.addNewSchedule.bind(this)}>New Schedule</Button>
        <div className="input-group">
          <input ref="search" type="text" className="form-control" 
            placeholder="Search employees" aria-describedby="sizing-addon2" 
            onChange={this.searchEmployee.bind(this)} />
          <span className="input-group-addon" id="sizing-addon2">
            <button className="btn-link" onClick={this.clearSearch.bind(this)}><i className="fa fa-undo"/></button>
          </span>
        </div>
        {this.renderEmployeeScheduleList()}
      </div>
    )
  }

  renderScheduleList() {
  	const {schedules, currentIndex} = this.props;
  	return (
  		<ListGroup>
      {
        schedules.map((schedule, index) => {
          return (
            <ListGroupItem key={index} onClick={this.handleClick.bind(this, index)}>
              <b>{schedule.employee.name ? schedule.employee.name : "New Schedule"}</b> <br/>
              {schedule.startDate ? moment(schedule.startDate).format('MMM D, YYYY') : ''} <br/>
              {schedule.jobTitle ? `${schedule.jobTitle}` : ''}
              {this.renderSaveStatus(index)}
            </ListGroupItem>
          )
        })
      }
      </ListGroup>
  	);
  }

  renderEmployeeScheduleList() {
    const {schedules, currentIndex} = this.props;

    let scheduleMap = this.getSortedScheduleMap();
    let scheduleList = [];

    for (let employeeName of scheduleMap.keys()) {
      let indexList = scheduleMap.get(employeeName);
      let panel = (
        <Panel header={employeeName} eventKey={employeeName} key={employeeName}>
        	<ListGroup>
	        {
	          indexList.map(index => {
	          	let schedule = schedules[index];
		          return (
	              <ListGroupItem key={index} active={index === currentIndex} onClick={this.handleClick.bind(this, index)}>
	                {moment(schedule.startDate).format('MM/DD/YYYY')} -  {moment(schedule.endDate).format('MM/DD/YYYY')}
	                {this.renderSaveStatus(index)}
	                <br/>
	                {schedule.jobTitle} {this.renderScheduleType(index)}               
	              </ListGroupItem>
	            );
	          })
	        }
	        </ListGroup>
        </Panel>
      )
      scheduleList.push(panel);
    }
    //console.log('activeKey = ', this.state.activeKey);
    return (
      <PanelGroup accordion activeKey={this.state.activeKey} onSelect={this.handlePanelSelected.bind(this)}>
        {scheduleList}
      </PanelGroup>
    );
  }

  renderScheduleType(index) {
  	const {schedules} = this.props;
  	const scheduleType = schedules[index].type;
  	//console.log(`scheduleType = ${scheduleType}`);
  	if(scheduleType) {
  		if (scheduleType.match(/regular/i)) {
	  		return (<Badge>REG</Badge>);
	  	}
	  	else if (scheduleType.match(/on\-call/i)) {
	  		return (<Badge>OC</Badge>);
	  	}	
      else if (scheduleType.match(/temporary/i)) {
        return (<Badge>TMP</Badge>);
      } 
  	} else {
  		return '';
  	}
  }

  renderSaveStatus(index) {
    const {schedules} = this.props;
    if (!schedules[index].saved) {
      return (
        <Label bsClass="pull-right"><Glyphicon glyph="pencil"/></Label>
      );
    }
    else {
      return '';
    }
  }

  handleClick(scheduleIndex) {
    const {dispatch} = this.props;
    //console.log(`scheduleIndex=${scheduleIndex}`);
    dispatch(fetchSchedule(parseInt(scheduleIndex)));
  }

  addNewSchedule() {
    const {dispatch, schedules, currentIndex} = this.props;
    const lastIndex = schedules.length;
    //console.log(`Add new schedule: ${lastIndex}`);
    const employee = _.cloneDeep(schedules[currentIndex].employee);
    dispatch(createSchedule(employee));
    dispatch(fetchSchedule(lastIndex));
  }

  handlePanelSelected(activeKey) {
  	const {dispatch, schedules} = this.props;
  	//console.log('Set activeKey: ', activeKey);
  	if (activeKey !== this.state.activeKey) {
  		let nextIndex = _.findIndex(schedules, (s) => (s.employee.name === activeKey));
	    this.setState({activeKey});
	    dispatch(fetchSchedule(nextIndex));	
  	}	
  }

  getSortedScheduleMap() {
  	const {schedules, currentIndex, filter} = this.props;

    let scheduleMap = new Map();
    for (let i = 0; i < schedules.length; i++) {
      let key = schedules[i].employee.name;
      let [firstName, lastName] = key.split(/\s+/);
      let regex = /.*/;
      if (filter !== '') {
        regex = new RegExp(`^${filter}`, 'i')
      }

      if (filter === '' || firstName.match(regex) || lastName.match(regex)) {
        if (scheduleMap.has(key)) {
          scheduleMap.get(key).push(i);
        } else {
          scheduleMap.set(key, [i]);
        }
      }
    }

    return new Map([...scheduleMap.entries()].sort());	
  }

  searchEmployee(event) {
    const {dispatch} = this.props;
    let searchText = event.target.value;
    console.log(searchText);
    dispatch(setFilter(searchText));
  }

  clearSearch() {
    const {dispatch} = this.props;
    console.log("reset filter", this.refs.search);
    this.refs.search.value = '';
    dispatch(resetFilter());
  }
}

export default connect(state => state)(EmployeeList);
