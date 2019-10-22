import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { relapses: state.relapses };
}

const ConnectedRelapseList = ({ relapses }) => (
  <ul className="list-group list-group-flush">
    {relapses.map((relapse, idx) => (
      <li className="list-group-item" key={idx}>
        {relapse.time}
      </li>
    ))}
  </ul>
);

ConnectedRelapseList.propTypes = {
  relapses: PropTypes.array.isRequired,
};

const RelapseList = connect(mapStateToProps)(ConnectedRelapseList);

export default RelapseList;
