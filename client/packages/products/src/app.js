import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import '../styles/tailwind.css';
import New from './pages/new';

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/products">
          <div>Products</div>
        </Route>
        <Route path="/products/new">
          <New />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
