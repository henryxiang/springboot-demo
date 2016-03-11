export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE'
export function updateSchedule(scheduleIndex, scheduleData) {
	return {
		type: UPDATE_SCHEDULE,
		scheduleIndex: scheduleIndex,
		scheduleData: scheduleData
	};
}

export const FETCH_SCHEDULE = 'FETCH_SCHEDULE'
export function fetchSchedule(scheduleIndex) {
	return {
		type: FETCH_SCHEDULE,
		scheduleIndex: scheduleIndex
	};
}

export const DELETE_SCHEDULE = 'DELETE_SCHEDULE'
export function deleteSchedule(scheduleIndex) {
	return {
		type: DELETE_SCHEDULE,
		scheduleIndex: scheduleIndex
	};
}

export const CREATE_SCHEDULE = 'CREATE_SCHEDULE'
export function createSchedule(employee) {
  return { 
  	type: CREATE_SCHEDULE,
  	employee: employee
  };
}

export const SET_FILTER = 'SET_FILTER'
export function setFilter(filter) {
  return {
    type: SET_FILTER,
    filter: filter
  }
}

export const RESET_FILTER = 'RESET_FILTER'
export function resetFilter() {
  return {
    type: RESET_FILTER
  }
}
