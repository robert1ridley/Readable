import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import SingleCategory from '../pages/SingleCategory';
import NotFound from '../pages/NotFound';
import Header from '../components/Header';

class Routes extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:category" component={SingleCategory} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes;