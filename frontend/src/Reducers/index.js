import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';

const allReducers = combineReducers({
  categoryReducer,
  postsReducer,
  commentsReducer
});

export default allReducers;