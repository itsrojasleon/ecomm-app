import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import '../styles/tailwind.css';

import Products from './pages';
import New from './pages/new';

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/products" component={Products} />
        <Route path="/products/new" component={New} />
      </Switch>
    </Router>
  );
};

export default App;
