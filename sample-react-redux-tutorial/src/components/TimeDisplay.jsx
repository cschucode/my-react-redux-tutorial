import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { timeSober: state.timeSober };
};

const ConnectedTimeDisplay = ({ timeSober }) => (
  <div className="">
    <h3>Clean Time</h3>
    <div>{timeSober}</div>
  </div>
);

const TimeDisplay = connect(mapStateToProps)(ConnectedTimeDisplay);

export default TimeDisplay;
