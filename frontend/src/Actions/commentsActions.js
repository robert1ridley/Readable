export const START_FETCH_COMMENTS = 'START_FETCH_COMMENTS';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const START_UPDATE_COMMENT_VOTE_COUNT = 'START_UPDATE_COMMENT_VOTE_COUNT';
export const UPDATE_COMMENT_VOTE_COUNT_SUCCESS = 'UPDATE_COMMENT_VOTE_COUNT_SUCCESS';
export const UPDATE_COMMENT_VOTE_COUNT_FAILURE = 'UPDATE_COMMENT_VOTE_COUNT_FAILURE';
export const START_EDIT_COMMENT = 'START_EDIT_COMMENT';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';
export const START_DELETE_COMMENT = 'START_DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';
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

export const startEditComment = () => ({
  type: START_EDIT_COMMENT
});

export const editCommentSuccess = (comment) => ({
  type: EDIT_COMMENT_SUCCESS,
  payload: { comment }
});

export const editCommentFailure = error => ({
  type: EDIT_COMMENT_FAILURE,
  payload: { error }
});

export const startDeleteComment = () => ({
  type: START_DELETE_COMMENT
});

export const deleteCommentSuccess = (commentId) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: commentId
});

export const deleteCommentFailure = error => ({
  type: DELETE_COMMENT_FAILURE,
  payload: error
})

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
      .then(handleErrors)
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

export function editComment(comment) {
  const payload = {
    timestamp: comment.timestamp,
    body: comment.body,
    id: comment.id
  }
  return dispatch => {
    dispatch(startEditComment());
    return fetch(`${BASE_URL}/comments/${comment.id}`, { 
      headers: { 
        'Authorization': headers.Authorization,
        'content-type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(comment)
    })
    .then(handleErrors)
      .then(response => {
        response.json()
      })
      .then(data => {
        dispatch(editCommentSuccess(payload));
        return data
        }
      )
      .catch(error => dispatch(editCommentFailure(error)))
  }
}

export function deleteComment(commentId) {
  return dispatch => {
    dispatch(startDeleteComment());
    return fetch(`${BASE_URL}/comments/${commentId}`, { 
      headers: { 
        'Authorization': headers.Authorization,
        'content-type': 'application/json'
      },
      method: "DELETE"
    })
    .then(handleErrors)
      .then(response => {
        response.json()
      })
      .then(data => {
        dispatch(deleteCommentSuccess(commentId));
        return data
        }
      )
      .catch(error => dispatch(deleteCommentFailure(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}