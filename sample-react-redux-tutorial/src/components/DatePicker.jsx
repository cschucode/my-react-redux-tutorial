import React from 'react';
import { connect } from 'react-redux';
import { updateTimeSober } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    updateTimeSober: timeSober => dispatch(updateTimeSober(timeSober)),
  };
};

class ConnectedDatePicker extends React.Component {
  constructor() {
    super();


  }

  handleChange(el) {
    el.preventDefault();

    console.log('VALUE::', el.target.value);
  }

  render() {
    return <input onChange={this.handleChange} type="date" />;
  }
};

const DatePicker = connect(null, mapDispatchToProps)(ConnectedDatePicker);

export default DatePicker;
