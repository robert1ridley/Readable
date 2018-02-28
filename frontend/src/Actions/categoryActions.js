export const START_FETCH_CATEGORIES = 'START_FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

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
    return fetch(`http://localhost:3001/categories`, { headers: { 'Authorization': Math.random().toString(36).substr(-8) }})
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCategoriesSuccess(json.categories));
        return json.categories;
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