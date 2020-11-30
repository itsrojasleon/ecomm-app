import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Signin from './pages/signin';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth/signin" component={Signin} />
        <Route path="/auth/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default App;
