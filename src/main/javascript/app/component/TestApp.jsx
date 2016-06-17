import React from 'react';
// import ReactDOM from 'react-dom';
// import moment from 'moment';
import fetech from 'isomorphic-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

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

        <h3>User List</h3>
        <ul>
          {users.map((u,i) => (<li key={i}>{u.id}, {u.userName}, {u.firstName}, {u.lastName}, {u.birthday}</li>))}
        </ul>
          <FontIcon
              className="muidocs-icon-action-home"
              style={iconStyles}
              color={red500}
              hoverColor={greenA200}
          />
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
          console.debug("Users => ", JSON.stringify(json, null, 2));
          this.setState({users: json});
      });
  }

});

export default TestApp;
