import React from 'react';
// import ReactDOM from 'react-dom';
// import moment from 'moment';
import fetech from 'isomorphic-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FlatButton from 'material-ui/lib/flat-button';

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
          console.debug("Users => ", JSON.stringify(json, null, 2));
          this.setState({users: json});
      });
  }

});

export default TestApp;
