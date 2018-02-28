import React from 'react';
import PostsList from '../components/PostsList';

class Home extends React.Component{
  render() {
    const { posts } = this.props;

    return (
      <div>
        {
          posts &&
          <PostsList posts={posts} />
        }
      </div>
    )
  }
}

export default Home;