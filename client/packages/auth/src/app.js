import React, { lazy, Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import '../styles/tailwind.css';

const Signup = lazy(() => import('./pages/signup'));
const Signin = lazy(() => import('./pages/signin'));

const App = ({ history, onSignin }) => {
  return (
    <Router history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth/signin">
            <Signin />
          </Route>
          <Route path="/auth/signup">
            <Signup />
          </Route>
          <Route path="/auth/signout">
            <div>Signout</div>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
