import React, {Component} from 'react';
import {Row, Col, Panel} from 'react-bootstrap';
import EmployeeList from './EmployeeList.jsx';
import ScheduleHeader from './ScheduleHeader.jsx';
import ScheduleBody from './ScheduleBody.jsx';

class App extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col md={3}><EmployeeList /></Col>
          <Col md={9}>
            <Panel>
              <ScheduleHeader />
              <ScheduleBody />
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }

}

export default App;
