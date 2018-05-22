import React from 'react';
import OnePostItem from '../components/OnePostItem';
import CommentsList from '../components/CommentsList';
import { connect } from 'react-redux';
import NotFound from './NotFound';
import { setCategory } from '../Actions/categoryActions';

class SinglePost extends React.Component {
  componentDidMount(){
    this.props.dispatch(setCategory(this.props.match.params.category));
  }
  
  render(){
    const { match, error, deleted, singleItemNotFound } = this.props;
    if(error || deleted || singleItemNotFound){
      return (<NotFound />)
    }
    else {
      return (
        <div>
          <OnePostItem postId={match.params.post} />
          <CommentsList postId={match.params.post} />
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  error: state.postsReducer.error,
  deleted: state.postsReducer.singleItem.deleted,
  singleItemNotFound: state.postsReducer.singleItemNotFound
});

export default connect(mapStateToProps)(SinglePost);