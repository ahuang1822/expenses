import { browserHistory } from 'react-router';

const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_AMOUNT = 'UPDATE_AMOUNT';

const initialState = {
  category: '',
  description: '',
  amount: 0
};

const addCategory = (category) => ({ type: UPDATE_CATEGORY, category});
const addDescription = (description) => ({ type: UPDATE_DESCRIPTION, description});
const addAmount = (amount) => ({ type: UPDATE_AMOUNT, amount });

export const updateCategory = (category) => {
  return function thunk (dispatch) {
    dispatch(addCategory(category));
    browserHistory.push('/description');
  }
}

export const updateDescription = (description) => {
  return function thunk (dispatch) {
    dispatch(addDescription(description));
    browserHistory.push('/amount');
  }
}
 
export const updateAmount = (amount) => {
  return function thunk (dispatch) {
    dispatch(addAmount(amount));
    browserHistory.push('/confirmation');
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_CATEGORY:
      return Object.assign({}, state, { category: action.category });
    case UPDATE_DESCRIPTION:
      return Object.assign({}, state, { description: action.description });
    case UPDATE_AMOUNT:
      return Object.assign({}, state, { amount: action.amount });
    default:
      return state;
  }
}