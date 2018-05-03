import {
  START_FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  START_UPDATE_COMMENT_VOTE_COUNT,
  UPDATE_COMMENT_VOTE_COUNT_SUCCESS,
  UPDATE_COMMENT_VOTE_COUNT_FAILURE
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
      }

    default:
      return state;
  }
}

    