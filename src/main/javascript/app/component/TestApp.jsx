import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import fetech from 'isomorphic-fetch';

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
      </div>
    )
  },

  componentDidMount() {
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