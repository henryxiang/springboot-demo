import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/jquery-ui.min.css';
import './css/jquery.ui.datepicker.min.css';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './component/TestApp.jsx';

//const appRootElement = document.createElement('div');
//appRootElement.className = 'app';
//document.body.appendChild(appRootElement);
const appRootElement = document.getElementById("app");

ReactDOM.render(
  <App />,
  appRootElement
);
