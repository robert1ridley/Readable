import React from 'react';
import OnePostItem from '../components/OnePostItem';
import CommentsList from '../components/CommentsList';
import { connect } from 'react-redux';
import NotFound from './NotFound';

class SinglePost extends React.Component {
  
  render(){
    const { match, error, loading, posts, post } = this.props;
    if(error){
      return (<NotFound />)
    }
    else {
      return (
        <div>
          <OnePostItem postId={match.params.post} />
          <CommentsList postId={match.params.post} />
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  loading: state.postsReducer.loading,
  error: state.postsReducer.error,
  post: state.postsReducer.post,
  posts: state.postsReducer.items
});

export default connect(mapStateToProps)(SinglePost);