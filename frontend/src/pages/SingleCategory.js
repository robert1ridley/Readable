import React from 'react';
import { connect } from 'react-redux';
import PostsList from '../components/PostsList';
// import { fetchPostsByCategory } from '../Actions/postsActions';

class SingleCategory extends React.Component {
  componentDidMount() {
    // console.log(this.props.match.params.id)
    // this.props.dispatch(fetchPostsByCategory(this.props.match.params.id));
  }

  render(){
    let { posts } = this.props
    posts = posts.filter(post => post.category === this.props.match.params.id);
    
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

const mapStateToProps = state => ({
  posts: state.postsReducer.items,
  loading: state.postsReducer.loading,
  error: state.postsReducer.error
});

export default connect(mapStateToProps)(SingleCategory);