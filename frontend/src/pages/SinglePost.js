import React from 'react';
import OnePostItem from '../components/OnePostItem';
import CommentsList from '../components/CommentsList';
import { connect } from 'react-redux';
import NotFound from './NotFound';

//TODO: Figure out redirect on unmatched item
const SinglePost = (props) => {
  const { match, error, loading, posts, post } = props;
  
  return (
    <div>
      <OnePostItem postId={match.params.post} />
      <CommentsList postId={match.params.post} />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.postsReducer.loading,
  error: state.postsReducer.error,
  post: state.postsReducer.post,
  posts: state.postsReducer.items
});

export default connect(mapStateToProps)(SinglePost);