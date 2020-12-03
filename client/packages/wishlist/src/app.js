import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Wishlist from './pages/wishlist';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/wishlist" component={Wishlist} />
      </Switch>
    </Router>
  );
};

export default App;
