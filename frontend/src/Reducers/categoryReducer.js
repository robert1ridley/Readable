import {
  START_FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
} from '../Actions/categoryActions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function categoryReducer(state = initialState, action) {
  switch(action.type) {
    case START_FETCH_CATEGORIES:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.categories
      };

    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}