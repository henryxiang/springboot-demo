import _ from 'lodash';
import faker from 'faker';
import moment from 'moment';

const createScheule = (startDate, endDate) => {
  let scheduleId = _.uniqueId();
  let entryId, entry;
  let schedule = {
    id: scheduleId,
    startDate: startDate,
    endDate: endDate,
    saved: true,
    isNew: false,
    isRecurring: true,
    type: 'Regular',
    recurring: [],
    nonrecurring: []
  };
  for (let j = 1; j <= 5; j++) {
    entryId = _.uniqueId();
    entry = {id: entryId, week: 1, weekday: j, startTime: '8:00 AM', endTime: '4:30 PM', breakTime: 30};
    schedule.recurring.push(entry);
  }
  return schedule;
};

export function initSchedules() {
  let schedules = [];
  for (let i = 1; i <= 8; i++) {
    let employeeId = _.uniqueId();
    let employeeName = `${faker.name.firstName()} ${faker.name.lastName()}`;
    let d2 = faker.date.past();
    let d1 = moment(d1).subtract(6, 'months');
    let jobs = [faker.name.jobTitle()];
    //if (i%2 == 0) {
      jobs.push(faker.name.jobTitle());
    //}
    let schedule = createScheule(d1, d2);
    schedule.employee = {id: employeeId, name: employeeName, jobs: jobs};
    schedule.jobTitle = jobs[0];
    schedules.push(schedule);

    d1 = moment(d2).add(1, 'days');
    d2 = faker.date.future();
    schedule = createScheule(d1, d2);
    schedule.employee = {id: employeeId, name: employeeName, jobs: jobs};
    schedule.jobTitle = jobs[0];
    schedules.push(schedule)
  }
  return schedules;
}