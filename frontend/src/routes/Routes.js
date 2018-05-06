import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import SinglePost from '../pages/SinglePost';
import SingleCategory from '../pages/SingleCategory';
import NotFound from '../pages/NotFound';
import Header from '../components/Header';

class Routes extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <Header /> */}
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:category" component={SingleCategory} />
            <Route exact path="/:category/:post" component={SinglePost} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes;