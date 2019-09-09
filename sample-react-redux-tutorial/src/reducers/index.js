import { ADD_RELAPSE_DATE } from '../actions/index';

const initialState = {
  timeSober: null,
  relapses: [],
};

function rootReducer(state = initialState, action) {
  const type = action.type;

  switch(type) {
    case type === ADD_RELAPSE_DATE:
      return Object.assign({}, state, {
        relapses: state.relapses.concat(action.payload),
      });
    default:
      return initialState;
  }
};

export default rootReducer;
