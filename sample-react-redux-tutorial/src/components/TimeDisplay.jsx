import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const mapStateToProps = state => {
  return { timeSober: state.timeSober };
};

const ConnectedTimeDisplay = ({ timeSober }) => (
  <div className="">
    <h3>Clean</h3>
    <Moment fromNow ago>{timeSober}</Moment>
  </div>
);

const TimeDisplay = connect(mapStateToProps)(ConnectedTimeDisplay);

export default TimeDisplay;
