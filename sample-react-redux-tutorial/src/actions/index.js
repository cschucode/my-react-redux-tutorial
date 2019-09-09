export const ADD_RELAPSE_DATE = 'ADD_RELAPSE_DATE';

export function addRelapseDate(payload) {
  return {
    type: ADD_RELAPSE_DATE,
    payload,
   };
};
