import React from 'react';
import $ from 'jquery';
import datepicker from 'jquery-ui/datepicker';
import moment from 'moment';

const DatePicker = React.createClass({

  propTypes: {
    defaultDate: React.PropTypes.any,
    onChange: React.PropTypes.func
  },

  render() {
    return (
      <input ref="inputDate" type="text" />
    );
  },

  componentDidMount() {
    const {defaultDate} = this.props;
    let dateInput = this.refs.inputDate;
    let dateText = defaultDate ? moment(defaultDate).format("MM/DD/YYYY") : '';
    //console.log('componentDidMount: ', dateInput, dateText);
    $(dateInput).val(dateText);
    $(dateInput).datepicker();
    $(dateInput).on('change', this.handleValueChange); 
  },

  handleValueChange(event) {
    event.preventDefault();
    const dateText = event.target.value;
    const dateValue = moment(dateText, 'MM/DD/YYYY').toDate();
    //console.log("input date: ", dateText, dateValue);
    this.props.onChange(dateValue, dateText);
  },

});

export default DatePicker;