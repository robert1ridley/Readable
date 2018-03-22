import sortBy from 'sort-by'
import {
  START_FETCH_SINGLE_POST,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAILURE,
  START_FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  SORT_POSTS_BY_NEWEST,
  SORT_POSTS_BY_OLDEST,
  SORT_POSTS_BY_MOST_LIKES,
  SORT_POSTS_BY_FEWEST_LIKES,
  START_UPDATE_VOTES,
  UPDATE_VOTES_SUCCESS,
  UPDATE_VOTES_FAILURE
} from '../Actions/postsActions';
import update from 'immutability-helper';

const initialState = {
  items: [],
  singleItem: {},
  loading: false,
  error: null
};

export default function postsReducer(state = initialState, action) {
  switch(action.type) {
    case START_FETCH_SINGLE_POST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        singleItem: action.payload.post
      };

    case FETCH_SINGLE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        singleItem: {}
      };

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
        items: action.payload.posts.sort(sortBy('timestamp')).slice().reverse()
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
        items: state.items.sort(sortBy('timestamp')).slice().reverse()
      };

    case SORT_POSTS_BY_OLDEST:
      return {
        ...state,
        items: state.items.sort(sortBy('timestamp')).slice()
      };

    case SORT_POSTS_BY_MOST_LIKES:
      return {
        ...state,
        items: state.items.sort(sortBy('voteScore')).slice().reverse()
      };

    case SORT_POSTS_BY_FEWEST_LIKES:
      return {
        ...state,
        items: state.items.sort(sortBy('voteScore')).slice()
      };

    case START_UPDATE_VOTES:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_VOTES_SUCCESS:
      return update(
        state, 
        {
        singleItem: {
          loading: {$set: false},
          error: {$set: null},
          voteScore: action.payload.vote === 'upVote' ? {$set: state.singleItem.voteScore + 1} : {$set: state.singleItem.voteScore - 1}
        },
        // items: 
      })
    
    case UPDATE_VOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    default:
      return state;
  }
}