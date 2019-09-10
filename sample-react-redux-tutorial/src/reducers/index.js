import { ADD_RELAPSE_DATE } from '../actions/index';

const initialState = {
  timeSober: 100,
  relapses: [],
};

function rootReducer(state = initialState, action) {
  const type = action.type;

  switch(type) {
    case ADD_RELAPSE_DATE:
      return Object.assign({}, state, {
        relapses: state.relapses.concat(action.payload),
        timeSober: 0,
      });
    default:
      return initialState;
  }
};

export default rootReducer;
