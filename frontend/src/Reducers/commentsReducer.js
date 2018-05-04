import {
  START_FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  START_UPDATE_COMMENT_VOTE_COUNT,
  UPDATE_COMMENT_VOTE_COUNT_SUCCESS,
  UPDATE_COMMENT_VOTE_COUNT_FAILURE,
  START_EDIT_COMMENT,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  START_DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE
} from '../Actions/commentsActions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function commentsReducer(state = initialState, action) {
  switch(action.type) {
    case START_FETCH_COMMENTS:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.comments
      };

    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case START_UPDATE_COMMENT_VOTE_COUNT:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_COMMENT_VOTE_COUNT_SUCCESS:
    const voteCount = action.payload.vote === 'upVote' ? 1 : - 1
      return {
        ...state,
        items: [...state.items.map((item) => ({...item,
          voteScore: item.id === action.payload.commentId ? item.voteScore + voteCount : item.voteScore}))],
        loading: false,
        error: null
      };

    case UPDATE_COMMENT_VOTE_COUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case START_EDIT_COMMENT:
      return {
        ...state,
        loading: true,
        error: null
      };

    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: [...state.items.map((item) => ({...item,
          body: item.id === action.payload.comment.id ? action.payload.comment.body : item.body
        }))]
      };

    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    case START_DELETE_COMMENT:
      return {
        ...state,
        loading: true,
        error: null
      };

    case DELETE_COMMENT_SUCCESS:
    console.log(action.payload)
      return {
        ...state,
        loading: false,
        error: null,
        items: state.items.filter(item => item.id !== action.payload),
      }

    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    default:
      return state;
  }
}

    