import {
  START_FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../Actions/postsActions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function postsReducer(state = initialState, action) {
  switch(action.type) {
    case START_FETCH_POSTS:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.posts
      };

    default:
      return state;
  }
}