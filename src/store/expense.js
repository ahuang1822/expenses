import { browserHistory } from 'react-router';

const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

const initialState = {
  category: '',
  description: '',
  amount: 0
};

const addCategory = (category) => ({ type: UPDATE_CATEGORY, category});

export const updateCategory = (category) => {
  return function thunk (dispatch) {
    dispatch(addCategory(category));
    browserHistory.push('/description');
  }
}
  
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_CATEGORY:
      return Object.assign({}, state, { category: action.category });
    default:
      return state;
  }
}