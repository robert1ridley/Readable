import {
  START_FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
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

    default:
      return state;
  }
}

    