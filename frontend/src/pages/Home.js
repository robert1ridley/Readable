import React from 'react';
import { connect } from 'react-redux';
import PostsList from '../components/PostsList';
import { fetchPosts } from '../Actions/postsActions';
import SortButtons from '../components/SortButtons';

class Home extends React.Component{

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <SortButtons />
        {
          posts &&
          <PostsList posts={posts} />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.items,
  loading: state.postsReducer.loading,
  error: state.postsReducer.error
});

export default connect(mapStateToProps)(Home);