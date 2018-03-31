import React from 'react';
import OnePostItem from '../components/OnePostItem';
import CommentsList from '../components/CommentsList';
import { connect } from 'react-redux';
import NotFound from './NotFound';

const SinglePost = (props) => {
  const { match, error, loading } = props;
  if (!loading && !error) {
    return (
      <div>
        <OnePostItem postId={match.params.post} />
        <CommentsList postId={match.params.post} />
      </div>
    )
  }
  else if (error) {
    return <NotFound />
  }
  else return <div />
}

const mapStateToProps = state => ({
  loading: state.postsReducer.loading,
  error: state.postsReducer.error
});

export default connect(mapStateToProps)(SinglePost);