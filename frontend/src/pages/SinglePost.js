import React from 'react';
import OnePostItem from '../components/OnePostItem';
import CommentsList from '../components/CommentsList';
import { connect } from 'react-redux';
import NotFound from './NotFound';

class SinglePost extends React.Component {
  
  render(){
    const { match, error, deleted } = this.props;
    console.log(deleted)
    if(error || deleted){
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
  error: state.postsReducer.error,
  deleted: state.postsReducer.singleItem.deleted
});

export default connect(mapStateToProps)(SinglePost);