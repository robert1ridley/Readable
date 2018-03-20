import React from 'react';
import OnePostItem from '../components/OnePostItem';

class SinglePost extends React.Component {
  state = {
    params: ''
  }

  componentDidMount() {
    this.setState({
      params: this.props.match.params.post
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <OnePostItem params={this.state.params} />
      </div>
    )
  }
}

export default SinglePost;