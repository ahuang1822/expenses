const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_AMOUNT = 'UPDATE_AMOUNT';
const UPDATE_SPREADSHEETID = 'UPDATE_SPREADSHEETID';
const RESET_INPUT_FIELDS = 'RESET_INPUT_FIELDS';

const initialState = {
  description: '',
  amount: "",
  spreadsheetId: '',
};

const addDescription = (description) => ({ type: UPDATE_DESCRIPTION, description});
const addAmount = (amount) => ({ type: UPDATE_AMOUNT, amount });
const setSpreadsheetId = (spreadsheetId) => ({ type: UPDATE_SPREADSHEETID, spreadsheetId });
const clearInputFields = () => ({ type: RESET_INPUT_FIELDS });

export const updateDescription = (description) => {
  return function thunk (dispatch) {
    dispatch(addDescription(description));          
  };    
};
 
export const updateAmount = (amount) => {
  return function thunk (dispatch) {
    dispatch(addAmount(amount)); 
  };
};

export const updateSpreadsheetId = (spreadsheetId) => {
  return function thunk (dispatch) {
    dispatch(setSpreadsheetId(spreadsheetId));    
  };
};

export const resetInputFields = () => {
  return function thunk (dispatch) {
    dispatch(clearInputFields());    
  };
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_DESCRIPTION:
      return Object.assign({}, state, { description: action.description });
    case UPDATE_AMOUNT:
      return Object.assign({}, state, { amount: action.amount });
    case UPDATE_SPREADSHEETID:
      return Object.assign({}, state, { spreadsheetId: action.spreadsheetId });
    case RESET_INPUT_FIELDS:
      return Object.assign({}, state, { description: '', amount: '$' });
    default:
      return state;
  }
}