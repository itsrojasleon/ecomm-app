import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import User from './pages/user';
import '../styles/tailwind.css';

const App = ({ history, currentUser }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/users/:username">
          <User currentUser={currentUser} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
