export const START_FETCH_CATEGORIES = 'START_FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const startFetchCategories = () => ({
  type: START_FETCH_CATEGORIES
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: { categories }
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error }
});

export function fetchCategories() {
  return dispatch => {
    dispatch(startFetchCategories());
    return fetch(`${BASE_URL}/categories`, { headers: { 'Authorization': Math.random().toString(36).substr(-8) }})
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchCategoriesSuccess(data.categories));
        return data.categories;
      })
      .catch(error => dispatch(fetchCategoriesFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}