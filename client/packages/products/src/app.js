import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Products from './pages';
import Create from './pages/create';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/products/create" component={Create} />
        <Route path="/" component={Products} />
      </Switch>
    </Router>
  );
};

export default App;
