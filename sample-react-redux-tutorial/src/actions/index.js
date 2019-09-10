export const ADD_RELAPSE_DATE = 'ADD_RELAPSE_DATE';
export const UPDATE_TIME_SOBER = 'UPDATE_TIME_SOBER';

export function addRelapseDate(payload) {
  return {
    type: ADD_RELAPSE_DATE,
    payload,
   };
};

export function updateTimeSober(payload) {
  return {
    type: UPDATE_TIME_SOBER,
    payload,
  };
};
