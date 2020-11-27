import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import '../styles/tailwind.css';

const Products = lazy(() => import('./pages'));
const New = lazy(() => import('./pages/new'));

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route path="/products/new">
            <New />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
