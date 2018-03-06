import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import postsReducer from './postsReducer';

const allReducers = combineReducers({
  categoryReducer,
  postsReducer
});

export default allReducers;