import React from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../Actions/postsActions';

class SinglePost extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSinglePost(this.props.match.params.post));
  }

  render() {
    console.log(this.props.posts.filter(post => post.id === this.props.match.params.post))
    return (
      <div>
        <h1>Head</h1>
        <p>This is the post with id {this.props.match.params.post} from category {this.props.match.params.category}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.items,
  loading: state.postsReducer.loading,
  error: state.postsReducer.error
});

export default connect(mapStateToProps)(SinglePost);