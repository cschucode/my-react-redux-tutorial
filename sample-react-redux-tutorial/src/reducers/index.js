import {
  ADD_RELAPSE_DATE,
  UPDATE_TIME_SOBER,
} from '../actions/index';

const initialState = {
  timeSober: '',
  relapses: [],
};

function rootReducer(state = initialState, action) {
  const type = action.type;

  switch(type) {
    case UPDATE_TIME_SOBER:
      return Object.assign({}, state, {
        timeSober: action.payload,
      });
    case ADD_RELAPSE_DATE:
      const date = new Date();

      return Object.assign({}, state, {
        relapses: state.relapses.concat(action.payload),
        timeSober: date.toUTCString(),
      });
    default:
      return initialState;
  }
};

export default rootReducer;
