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
  UPDATE_VOTES_FAILURE,
  START_DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  START_ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  START_EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
} from '../Actions/postsActions';

const initialState = {
  items: [],
  singleItem: {},
  singleItemNotFound: false,
  loading: false,
  error: null
};

export default function postsReducer(state = initialState, action) {
  switch(action.type) {
    case START_FETCH_SINGLE_POST:
      return {
        ...state,
        loading: true,
        error: null,
        singleItemNotFound: false
      };

    case FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        singleItem: action.payload.post,
        singleItemNotFound: Object.keys(action.payload.post).length === 0 ? true : false
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
        error: null,
        singleItemNotFound: false
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.posts.sort(sortBy('timestamp')).slice().reverse(),
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
      const voteCount = action.payload.vote === 'upVote' ? 1 : - 1
      return {
        ...state,
        loading: false,
        error: null,
        singleItem: {
          ...state.singleItem,
          voteScore: state.singleItem.voteScore + voteCount
        },
        items: [...state.items.map((item) => ({...item,
          voteScore: item.id === action.payload.postId ? item.voteScore + voteCount : item.voteScore}))]
      }
    
    case UPDATE_VOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    case START_DELETE_POST:
      return {
        ...state,
        loading: true
      }
    
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        singleItem: {},
        items: state.items.filter(item => item.id !== action.payload.postId)
      }

    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    case START_ADD_POST:
      return {
        ...state,
        loading: true
      }
    
    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        singleItem: {},
        items: [...state.items, action.payload.post]
      }

    case ADD_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    case START_EDIT_POST:
      return {
        ...state,
        loading: true
      }
    
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        singleItem: {},
        items: state.items.map(item => item.id === action.payload.post.id ? Object.assign(item, { title: action.payload.post.title, body: action.payload.post.body }) : item )
      }

    case EDIT_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    default:
      return state;
  }
}