export const START_FETCH_SINGLE_POST = 'START_FETCH_SINGLE_POST';
export const FETCH_SINGLE_POST_SUCCESS = 'FETCH_SINGLE_POST_SUCCESS';
export const FETCH_SINGLE_POST_FAILURE = 'FETCH_SINGLE_POST_FAILURE';
export const START_FETCH_POSTS = 'START_FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const SORT_POSTS_BY_NEWEST = 'SORT_POSTS_BY_NEWEST';
export const SORT_POSTS_BY_OLDEST = 'SORT_POSTS_BY_OLDEST';
export const SORT_POSTS_BY_MOST_LIKES = 'SORT_POSTS_BY_MOST_LIKES';
export const SORT_POSTS_BY_FEWEST_LIKES = 'SORT_POSTS_BY_FEWEST_LIKES';
export const START_UPDATE_VOTES = 'START_UPDATE_VOTES';
export const UPDATE_VOTES_SUCCESS = 'UPDATE_VOTES_SUCCESS';
export const UPDATE_VOTES_FAILURE = 'UPDATE_VOTES_FAILURE';
export const START_DELETE_POST = 'START_DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const startFetchSinglePost = () => ({
  type: START_FETCH_SINGLE_POST
});

export const fetchSinglePostSuccess = post => ({
  type: FETCH_SINGLE_POST_SUCCESS,
  payload: { post }
});

export const fetchSinglePostFailure = error => ({
  type: FETCH_SINGLE_POST_FAILURE,
  payload: { error }
});

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

export const sortPostsByNewest = () => ({
  type: SORT_POSTS_BY_NEWEST
});

export const sortPostsByOldest = () => ({
  type: SORT_POSTS_BY_OLDEST
});

export const sortPostsByMostLikes = () => ({
  type: SORT_POSTS_BY_MOST_LIKES
});

export const sortPostsByFewestLikes = () => ({
  type: SORT_POSTS_BY_FEWEST_LIKES
});

export const startUpdateVotes = () => ({
  type: START_UPDATE_VOTES
});

export const updateVotesSuccess = vote => ({
  type: UPDATE_VOTES_SUCCESS,
  payload: { vote }
});

export const updateVotesFailure = error => ({
  type: UPDATE_VOTES_FAILURE,
  payload: { error }
});

export const startDeletePost = () => ({
  type: START_DELETE_POST
});

export const deletePostSuccess = postId => ({
  type: DELETE_POST_SUCCESS,
  payload: { postId }
});

export const deletePostFailure = error => ({
  type: DELETE_POST_FAILURE,
  payload: { error }
});

const headers = {
  Authorization: Math.random().toString(36).substr(-8)
};

export function fetchPosts() {
  return dispatch => {
    dispatch(startFetchPosts());
    return fetch(`${BASE_URL}/posts`, { headers: { 'Authorization': headers.Authorization }})
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
    return fetch(`${BASE_URL}/${category}/posts`, { headers: { 'Authorization': headers.Authorization }})
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchPostsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchPostsFailure(error)));
  };
}

export function fetchSinglePost(id) {
  return dispatch => {
    dispatch(startFetchSinglePost());
    return fetch(`${BASE_URL}/posts/${id}`, { headers: { 'Authorization': headers.Authorization }})
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchSinglePostSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchSinglePostFailure(error)));
  };
}

export function updateVotes(vote, postId) {
  const payload = {
    option: vote
  }
  return dispatch => {
    dispatch(startUpdateVotes());
    return fetch(`${BASE_URL}/posts/${postId}`, { 
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
        console.log(data);
        dispatch(updateVotesSuccess(vote));
        return data
        }
      )
      .catch(error => dispatch(updateVotesFailure(error)))
  }
}

export function deletePost(postId) {
  return dispatch => {
    dispatch(startDeletePost());
    return fetch(`${BASE_URL}/posts/${postId}`, { 
      headers: { 
        'Authorization': headers.Authorization,
        'content-type': 'application/json'
      },
      method: "DELETE"
    })
      .then(response => {
        response.json()
      })
      .then(data => {
        dispatch(deletePostSuccess(postId));
        return data
        }
      )
      .catch(error => dispatch(deletePostFailure(error)))
  }
}


function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}