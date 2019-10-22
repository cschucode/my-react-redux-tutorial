import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateTimeSober } from '../actions/index';

function mapDispatchToProps(dispatch: any) {
  return {
    dispatchUpdateSobrietyDate: (timeSober: string) => dispatch(updateTimeSober(timeSober)),
  };
};

interface DatePickerProps {
  dispatchUpdateSobrietyDate: any;
};

class ConnectedDatePicker extends React.Component<DatePickerProps, {}> {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(el: any) {
    el.preventDefault();
    const date = new Date(el.target.value).toUTCString();
    this.props.dispatchUpdateSobrietyDate(date);
  }

  render() {
    return <input className="form-control" onChange={this.handleChange} type="date" />;
  }
};

const DatePicker = connect(null, mapDispatchToProps)(ConnectedDatePicker);

export default DatePicker;
