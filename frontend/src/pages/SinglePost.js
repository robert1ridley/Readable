import React from 'react';
import OnePostItem from '../components/OnePostItem';
import CommentsList from '../components/CommentsList';

class SinglePost extends React.Component {
  render() {
    return (
      <div>
        <OnePostItem postId={this.props.match.params.post} />
        <CommentsList postId={this.props.match.params.post} />
      </div>
    )
  }
}

export default SinglePost;