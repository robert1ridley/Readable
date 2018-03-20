import React from 'react';
import OnePostItem from '../components/OnePostItem';
import CommentsList from '../components/CommentsList';

class SinglePost extends React.Component {
  render() {
    console.log(this.props.match.params.post)
    return (
      <div>
        <OnePostItem postId={this.props.match.params.post} />
        <CommentsList />
      </div>
    )
  }
}

export default SinglePost;