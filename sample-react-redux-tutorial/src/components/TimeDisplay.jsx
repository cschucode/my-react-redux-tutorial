import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const mapStateToProps = state => {
  return { timeSober: state.timeSober };
};

const ConnectedTimeDisplay = ({ timeSober }) => (
  <div className="">
    <h3>Clean</h3>
    {timeSober && <Moment date={timeSober} fromNow ago />}
  </div>
);

ConnectedTimeDisplay.propTypes = {
  timeSober: PropTypes.string,
};

const TimeDisplay = connect(mapStateToProps)(ConnectedTimeDisplay);

export default TimeDisplay;
