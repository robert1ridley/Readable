import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { editPost } from '../Actions/postsActions';
import InnerForm from './InnerForm';

function guid() {
  function _p8(s) {
      var p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

class UpdatePostPopUp extends React.Component {
  state = {
    post: {
      id: '',
      timestamp: '',
      title: '',
      body: '',
      author: '',
      voteScore: null,
      commentCount: null,
      category: '' 
    }
  };

  componentDidMount() {
    this.setState({
      ...this.state.post,
      post: {
        id: this.props.post.id,
        timestamp: this.props.post.timestamp,
        title: this.props.post.title,
        body: this.props.post.body,
        author: this.props.post.author,
        voteScore: this.props.post.voteScore,
        commentCount: this.props.post.commentCount,
        category: this.props.post.timestamp
      }
    })
  }

  handleChange = name => event => {
    this.setState({
      ...this.state.post,
      post: {
        [name]: event.target.value
      }
    });
  };

  updateStateOnSubmit = () => {
    this.setState({
      ...this.state.post,
      post: {
        timestamp: Date.now(),
        id: guid()
      }
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.updateStateOnSubmit()
    this.props.dispatch(editPost(this.state.post))
    .then(this.props.closePopUp)
    .then(this.props.history.push("/"))
  }

  render() {
    return (
      <InnerForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        open={this.props.open}
        closePopUp={this.props.closePopUp}
        // category={this.state.category}
        formData={this.state.post}
      />
    );
  }
}

const mapStateToProps = state => ({
  post: state.postsReducer.singleItem,
  loading: state.postsReducer.loading,
  error: state.postsReducer.error
});

const wrappedComponent = withRouter(UpdatePostPopUp);
export default connect(mapStateToProps)(wrappedComponent);