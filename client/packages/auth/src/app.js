import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import '../styles/tailwind.css';
import Signup from './pages/signup';
import Signin from './pages/signin';

const App = ({ history, onSignin }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth/signin">
          <Signin />
        </Route>
        <Route path="/auth/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
