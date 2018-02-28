import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';

const allReducers = combineReducers({
  categoryReducer: categoryReducer
});

export default allReducers;