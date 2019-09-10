import {
  ADD_RELAPSE_DATE,
  UPDATE_TIME_SOBER,
} from '../actions/index';

const initialState = {
  timeSober: 0,
  relapses: [],
};

function rootReducer(state = initialState, action) {
  const type = action.type;

  switch(type) {
    case UPDATE_TIME_SOBER:
      console.log('payload::', action.payload);
      return Object.assign({}, state, {
        timeSober: action.payload,
      });
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
