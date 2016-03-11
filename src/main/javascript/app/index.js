import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/jquery-ui.min.css';
import './css/jquery.ui.datepicker.min.css';

import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import App from './component/App.jsx';
import appStore from './store/schedule-store.js';

//const appRootElement = document.createElement('div');
//appRootElement.className = 'app';
//document.body.appendChild(appRootElement);
const appRootElement = document.getElementById("app");

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  appRootElement
);