import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateTimeSober } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    dispatchUpdateSobrietyDate: timeSober => dispatch(updateTimeSober(timeSober)),
  };
};

class ConnectedDatePicker extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(el) {
    el.preventDefault();
    const date = new Date(el.target.value).toUTCString();
    this.props.dispatchUpdateSobrietyDate(date);
  }

  render() {
    return <input className="form-control" onChange={this.handleChange} type="date" />;
  }
};

ConnectedDatePicker.propTypes = {
  dispatchUpdateSobrietyDate: PropTypes.func.isRequired,
};

const DatePicker = connect(null, mapDispatchToProps)(ConnectedDatePicker);

export default DatePicker;
