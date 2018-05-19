export const START_FETCH_CATEGORIES = 'START_FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
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

export const setCurrentCategory = categoryName => ({
  type: SET_CURRENT_CATEGORY,
  payload: categoryName
})

const headers = {
  Authorization: "whatever-you-want"
};

export function fetchCategories() {
  return dispatch => {
    dispatch(startFetchCategories());
    return fetch(`${BASE_URL}/categories`, { headers: { 'Authorization': headers.Authorization }})
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchCategoriesSuccess(data.categories));
        return data.categories;
      })
      .catch(error => dispatch(fetchCategoriesFailure(error)));
  };
}

export function setCategory(categoryName) {
  return dispatch => dispatch(setCurrentCategory(categoryName));
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}