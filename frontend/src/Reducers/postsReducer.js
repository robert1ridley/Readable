import sortBy from 'sort-by'
import {
  START_FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  SORT_POSTS_BY_NEWEST,
  SORT_POSTS_BY_OLDEST,
  SORT_POSTS_BY_MOST_LIKES,
  SORT_POSTS_BY_FEWEST_LIKES
} from '../Actions/postsActions';

const initialState = {
  items: [],
  sortTerm: 'NEWEST',
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

    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    case SORT_POSTS_BY_NEWEST:
      return {
        ...state,
        sortTerm: 'NEWEST',
        items: state.items.sort(sortBy('timestamp')).slice().reverse()
      };

    case SORT_POSTS_BY_OLDEST:
      return {
        ...state,
        sortTerm: 'OLDEST',
        items: state.items.sort(sortBy('timestamp')).slice()
      };

    case SORT_POSTS_BY_MOST_LIKES:
      return {
        ...state,
        sortTerm: 'MOST_LIKED',
        items: state.items.sort(sortBy('voteScore')).slice().reverse()
      };

    case SORT_POSTS_BY_FEWEST_LIKES:
      return {
        ...state,
        sortTerm: 'LEAST_LIKED',
        items: state.items.sort(sortBy('voteScore')).slice()
      }

    default:
      return state;
  }
}