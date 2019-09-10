import React from 'react';
import { connect } from 'react-redux';
import { addRelapseDate } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    addRelapseDate: relapseDate => dispatch(addRelapseDate(relapseDate)),
  };
};

const mapStateToProps = state => {
  return { relapses: state.relapses };
}

class ConnectedRelapseButton extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const d = new Date();
    const relapseDate = { time: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}` };

    this.props.addRelapseDate(relapseDate);
  }

  render() {
    return <button className="btn btn-sm btn-danger" onClick={this.handleClick}>Relapse</button>
  }
};

const RelapseButton = connect(mapStateToProps, mapDispatchToProps)(ConnectedRelapseButton);

export default RelapseButton;
