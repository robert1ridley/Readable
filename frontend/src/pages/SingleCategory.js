import React from 'react';
import { connect } from 'react-redux';
import PostsList from '../components/PostsList';
import { fetchPostsByCategory } from '../Actions/postsActions';

class SingleCategory extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPostsByCategory(this.props.match.params.category));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category && !this.props.loading){
      this.props.dispatch(fetchPostsByCategory(nextProps.match.params.category));
    }
  }

  render(){
    let { posts } = this.props
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