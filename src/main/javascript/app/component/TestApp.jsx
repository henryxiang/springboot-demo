import React from 'react';
// import ReactDOM from 'react-dom';
// import moment from 'moment';
import fetech from 'isomorphic-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FlatButton from 'material-ui/lib/flat-button';
import DatePicker from 'material-ui/lib/data-picker';

import {getLogger, dump} from '../util/logger.js';
// import log4javascript from 'log4javascript';

// const logFormat = "%d{HH:mm:ss} %-5p %c - %m%n";
// const popUpAppender = new log4javascript.PopUpAppender();
// const popUpLayout = new log4javascript.PatternLayout(logFormat);

// const getLogger = (loggerName) => {
//   const log = log4javascript.getLogger(loggerName);
//   popUpAppender.setLayout(popUpLayout);
//   log.addAppender(popUpAppender);
//   return log;
// }

// const dump = (data) => {
//   return JSON.stringify(data, null, 2);
// }

const log = getLogger("TestApp");

// Needed for onTouchTap or onClick event
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const TestApp = React.createClass({

  getInitialState() {
    return {users: []};
  },
  
  render() {
    const {users} = this.state;
    return (
      <div>
        <h3>User Lists</h3>

        <ul>
          {users.map((u,i) => (<li key={i}>{u.id}, {u.userName}, {u.firstName}, {u.lastName}, {u.birthday}</li>))}
        </ul>

        <FlatButton label="Default" />
        
      </div>
    )
  },

  componentWillMount() {
      fetch('/users', {
          credentials: 'include'
      })
      .then(response => {
          return response.json()
      })
      .then(json => {
          // console.debug("Users => ", JSON.stringify(json, null, 2));
          log.debug("Users => ", dump(json));
          this.setState({users: json});
      });
  }

});

export default TestApp;
