import React from 'react';

const SinglePost = (props) => {
  return (
    <div>
      <h1>Head</h1>
      <p>This is the post with id {props.match.params.post} from category {props.match.params.category}</p>
    </div>
  )
}

export default SinglePost;