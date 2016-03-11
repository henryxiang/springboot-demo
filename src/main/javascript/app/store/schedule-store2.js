import {createStore, combineReducers} from 'redux'
import {FETCH_SCHEDULE, UPDATE_SCHEDULE} from './actions'
import _ from 'lodash'
import faker from 'faker'
//import moment from 'moment'

function getInitialState() {
	var state = [];
	for (let i = 1; i <=5; i++) {
		let job = faker.name.jobTitle();
		let employee = {
			id: _.uniqueId(),
			name: `${faker.name.firstName()} ${faker.name.lastName()}`,
			assignments: [job],
			schedules: [
				{id: _.uniqueId(), job: job, startDate: faker.date.past(), endDate: faker.date.future(), entries: []}
			]
		}
		if (i % 2 == 0) {
			employee.assignments.push(faker.name.jobTitle());
		}
		for (let j = 1; j <= 5; j++) {
			let entry = {id: _.uniqueId(), week: 1, weekday: j, startTime: '8:00 AM', endTime: '4:30 PM', breakTime: 30, type: 'Regular'};
			employee.schedules[0].entries.push(entry);
		}
		state.push(employee);
	}
	// for (var i = 1; i <= 5; i++) {
	// 	var scheduleId = _.uniqueId();
	// 	var entryId, entry;
	// 	var schedule = {
	// 		id: scheduleId,
	// 		employee: {name: `${faker.name.firstName()} ${faker.name.lastName()}`, title: faker.name.jobTitle()},
	// 		startDate: faker.date.past(),
	// 		endDate: faker.date.future(),
	// 		saved: true,
	// 		recurring: [],
	// 		nonrecurring: []
	// 	};
	// 	for (var j = 1; j <= 5; j++) {
	// 		entryId = _.uniqueId();
	// 		entry = {id: entryId, week: 1, weekday: j, startTime: '8:00 AM', endTime: '4:30 PM', breakTime: 30, type: 'Regular'};
	// 		schedule.recurring.push(entry);
	// 	}
	// 	entryId = _.uniqueId();
	// 	entry = {id: entryId, week: 1, weekday: 6, startTime: '9:00 AM', endTime: '5:30 PM', breakTime: 30, type: 'On-Call'};
	// 	schedule.recurring.push(entry);
	// 	state.push(schedule);
	// }
	return state;
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
function schedules(state = getInitialState.call(null), action) {
	switch (action.type) {
		case UPDATE_SCHEDULE:
			var newState = _.cloneDeep(state);
			newState[action.scheduleIndex] = action.scheduleData;
			return newState;

		default:
			return state;
	}	
}

const appReducer = combineReducers({currentIndex, schedules})

export default createStore(appReducer);