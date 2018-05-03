export const START_FETCH_COMMENTS = 'START_FETCH_COMMENTS';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const START_UPDATE_COMMENT_VOTE_COUNT = 'START_UPDATE_COMMENT_VOTE_COUNT';
export const UPDATE_COMMENT_VOTE_COUNT_SUCCESS = 'UPDATE_COMMENT_VOTE_COUNT_SUCCESS';
export const UPDATE_COMMENT_VOTE_COUNT_FAILURE = 'UPDATE_COMMENT_VOTE_COUNT_FAILURE';
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

export const startUpdateCommentVoteCount = () => ({
  type: START_UPDATE_COMMENT_VOTE_COUNT
});

export const updateCommentVoteCountSuccess = (vote, commentId) => ({
  type: UPDATE_COMMENT_VOTE_COUNT_SUCCESS,
  payload: { vote, commentId }
});

export const updateCommentVoteCountFailure = error => ({
  type: UPDATE_COMMENT_VOTE_COUNT_FAILURE,
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

export function updateCommentVoteCount(vote, commentId) {
  const payload = {
    option: vote
  }
  return dispatch => {
    dispatch(startUpdateCommentVoteCount());
    return fetch(`${BASE_URL}/comments/${commentId}`, { 
      headers: { 
        'Authorization': headers.Authorization,
        'content-type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(response => {
        response.json()
      })
      .then(data => {
        dispatch(updateCommentVoteCountSuccess(vote, commentId));
        return data
        }
      )
      .catch(error => dispatch(updateCommentVoteCountFailure(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}