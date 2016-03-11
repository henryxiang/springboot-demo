import {createStore, combineReducers} from 'redux';
import {FETCH_SCHEDULE, UPDATE_SCHEDULE, CREATE_SCHEDULE, DELETE_SCHEDULE, SET_FILTER, RESET_FILTER} from './actions';
import {initSchedules} from './initializer'
import _ from 'lodash';
import faker from 'faker';
import moment from 'moment';

// Reducer for employee search filter
function filter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    case RESET_FILTER:
      return '';
    default:
      return state;
  }  
}

// Reducer for current index
function currentIndex (state = 0, action) {
  switch (action.type) {
    case FETCH_SCHEDULE:
      return action.scheduleIndex;
    default:
      return state;
  } 
}

// Reducer for schedule list
function schedules(state = initSchedules(), action) {
  switch (action.type) {
    case UPDATE_SCHEDULE:
      var newState = _.cloneDeep(state);
      newState[action.scheduleIndex] = action.scheduleData;
      return newState;
    case CREATE_SCHEDULE:
      var newState = _.cloneDeep(state);
      var newSchedule = {
        id: _.uniqueId(),
        employee: action.employee,
        jobTitle: action.employee.jobs[0],
        startDate: new Date(),
        endDate: moment().add(6, 'months'),
        type: 'Regular',
        saved: false,
        isNew: true,
        recurring: [],
        nonrecurring: []
      };
      newState.push(newSchedule);
      return newState;
    case DELETE_SCHEDULE:
      var newState = _.cloneDeep(state);
      newState.splice(action.scheduleIndex, 1);
      return newState;
    default:
      return state;
  } 
}

const appReducer = combineReducers({currentIndex, schedules, filter})

export default createStore(appReducer);