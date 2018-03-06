export const START_FETCH_POSTS = 'START_FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const startFetchPosts = () => ({
  type: START_FETCH_POSTS
});

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
});

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error }
});

export function fetchPosts() {
  return dispatch => {
    dispatch(startFetchPosts());
    return fetch(`${BASE_URL}/posts`, { headers: { 'Authorization': Math.random().toString(36).substr(-8) }})
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchPostsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchPostsFailure(error)));
  };
}

export function fetchPostsByCategory(category) {
  return dispatch => {
    dispatch(startFetchPosts());
    return fetch(`${BASE_URL}/${category}/posts`, { headers: { 'Authorization': Math.random().toString(36).substr(-8) }})
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchPostsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchPostsFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}