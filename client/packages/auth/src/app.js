import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import '../styles/tailwind.css';

const App = ({ history, onSignin }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth/signin">
          <div className="bg-red-500">Signin</div>
        </Route>
        <Route path="/auth/signup">
          <div>Signup</div>
        </Route>
        <Route path="/auth/signout">
          <div>Signout</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
