import React from 'react';
import { connect } from 'react-redux';
import PostsList from '../components/PostsList';
import { fetchPostsByCategory } from '../Actions/postsActions';
import { setCategory } from '../Actions/categoryActions'
import SortButtons from '../components/SortButtons';
import NotFound from './NotFound';

class SingleCategory extends React.Component {
  state = {
    notFound: false
  }

  componentDidMount() {
    const pageId = this.props.match.params.category;
    this.props.dispatch(fetchPostsByCategory(this.props.match.params.category))
    .then(() => {
      const foundIndex = this.props.categories.findIndex((el) => (el.name === pageId));
      foundIndex<0 ?
        this.setState ({
          notFound: true
        }):
        this.setState ({
          notFound: false
        })
      }
    )
    .then(() => this.props.dispatch(setCategory(pageId)))
  }

  componentWillReceiveProps(nextProps) {
    const pageId = nextProps.match.params.category;
    if ((this.props.posts !== nextProps.posts && !this.props.loading) || (nextProps.match.params.category !== this.props.match.params.category && !this.props.loading)){
      this.props.dispatch(fetchPostsByCategory(nextProps.match.params.category))
      .then(() => {
        const foundIndex = nextProps.categories.findIndex((el) => (el.name === pageId));
        foundIndex<0 ?
          this.setState ({
            notFound: true
          }):
          this.setState ({
            notFound: false
          })
        }
      )
      .then(() => this.props.dispatch(setCategory(pageId)))
    }
  }

  render(){
    const { posts } = this.props
    const { notFound } = this.state
    if(notFound){
      return(<NotFound/>)
    }
    else{
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
}

const mapStateToProps = state => ({
  posts: state.postsReducer.items,
  loading: state.postsReducer.loading,
  error: state.postsReducer.error,
  categories: state.categoryReducer.items
});

export default connect(mapStateToProps)(SingleCategory);