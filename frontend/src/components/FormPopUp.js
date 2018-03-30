import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { addPost } from '../Actions/postsActions';
import InnerForm from './InnerForm';

function guid() {
  function _p8(s) {
      var p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

class FormPopUp extends React.Component {
  state = {
    id: '',
    timestamp: '',
    title: '',
    body: '',
    author: '',
    voteScore: 1,
    commentCount: 0,
    category: 'react'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateStateOnSubmit = () => {
    this.setState({
      timestamp: Date.now(),
      id: guid()
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.updateStateOnSubmit()
    this.props.dispatch(addPost(this.state))
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
        category={this.state.category}
        formData={this.state}
      />
    );
  }
}

const wrappedComponent = withRouter(FormPopUp);
export default connect()(wrappedComponent);