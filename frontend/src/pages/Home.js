import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import PostsList from '../components/PostsList';
import Header from '../components/Header';

class Home extends React.Component{
  render() {
    const { classes, posts } = this.props;

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