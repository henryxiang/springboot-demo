import React from 'react';
import ReactDOM from 'react-dom';
import OptionList from './OptionList.jsx';
import moment from 'moment';

const TestApp = React.createClass({

  getInitialState() {
    return {
      value: 0,
      options: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  
  render() {

    return (
      <div>
        <OptionList ref='opt' options={this.state.options} value={this.state.value} onChange={this.handleChange} />
        <br/>
        <button onClick={this.handleClick}>Click</button>
      </div>
    );
  },

  handleChange(value) {
    console.log("handleChange: ", value);
    //this.setState({value: value});
  },

  handleClick() {
    console.log("handleClick");
    let el = ReactDOM.findDOMNode(this.refs.opt);
    let v = parseInt(el.value);
    console.log(`v=${v}`);
    //this.setState({value: this.state.value+1});
    el.value = (v+1)%7;
  },

});

export default TestApp;
