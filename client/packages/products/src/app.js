import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Products from './pages';
import Create from './pages/create';
import Show from './pages/show';
import Wishlist from './pages/wishlist';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/products/create" component={Create} />
        <Route exact path="/products/wishlist" component={Wishlist} />
        <Route path="/products/:id" component={Show} />
        <Route path="/" component={Products} />
      </Switch>
    </Router>
  );
};

export default App;
