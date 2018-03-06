import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import SingleCategory from '../pages/SingleCategory';
import NotFound from '../pages/NotFound';
import Header from '../components/Header';

class Routes extends React.Component {
  state = {
    posts: null
  }

  // componentDidMount() {
  //   fetch(`http://localhost:3001/posts`, { headers: { 'Authorization': Math.random().toString(36).substr(-8) }})
  //     .then(res => res.json())
  //     .then(data => 
  //       this.setState({
  //         posts: data
  //       })
  //     )
  // }

  render() {
    const { posts } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Home posts={posts}/>}/>
            <Route path="/:id" render={() => <SingleCategory posts={posts}/>}/>
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes;