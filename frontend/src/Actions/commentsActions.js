export const START_FETCH_COMMENTS = 'START_FETCH_COMMENTS';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const startFetchComments = () => ({
  type: START_FETCH_COMMENTS
});

export const fetchCommentsSuccess = comments => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: { comments }
});

export const fetchCommentsFailure = error => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: { error }
});

const headers = {
  Authorization: Math.random().toString(36).substr(-8)
}

export function fetchComments(id) {
  return dispatch => {
    dispatch(startFetchComments());
    return fetch(`${BASE_URL}/posts/${id}/comments`, { headers: { 'Authorization': headers.Authorization }})
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchCommentsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchCommentsFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}