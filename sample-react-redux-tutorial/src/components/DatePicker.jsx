import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateTimeSober } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    updateSobrietyDate: timeSober => dispatch(updateTimeSober(timeSober)),
  };
};

class ConnectedDatePicker extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(el) {
    el.preventDefault();

    this.props.updateSobrietyDate(el.target.value);
    el.target.value = "";
  }

  render() {
    return <input className="form-control" onChange={this.handleChange} type="date" />;
  }
};

ConnectedDatePicker.propTypes = {
  updateSobrietyDate: PropTypes.func.isRequired,
};

const DatePicker = connect(null, mapDispatchToProps)(ConnectedDatePicker);

export default DatePicker;
