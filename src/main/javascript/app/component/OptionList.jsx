import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

const OptionList = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    options: React.PropTypes.any,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func
  },

  render() {
    const {options, value} = this.props;
    let optionList = [];
    _.forEach(options, (v, k) => {
      let opt = (<option key={k} value={k}>{v}</option>);
      optionList.push(opt);
    });

    return (
      <select ref="selectInput" id={this.props.id} onChange={this.handleChange} defaultValue={value}>
        {optionList}
      </select>
    );
  },

  componentDidUpdate(props, state) {
    let selectInput = ReactDOM.findDOMNode(this.refs.selectInput);
    selectInput.value = props.value;
  },

  handleChange(event) {
    const {value} = event.target;
    this.props.onChange(value);
  },
});

export default OptionList;
