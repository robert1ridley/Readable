import React from 'react';
import PostsList from '../components/PostsList';

const SingleCategory = (props) => {
  const { posts } = props;
  return (
    <div>
      {
        posts &&
        <PostsList posts={posts} />
      }
    </div>
  )
}

export default SingleCategory;