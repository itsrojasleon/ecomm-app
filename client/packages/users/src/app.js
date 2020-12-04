import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import User from './pages/user';
import '../styles/tailwind.css';

// Only for dev purposes
// Pretend... there's a current user
// I'm a liar, I know
const App = ({
  history,
  currentUser = { id: 1, username: 'rojasleon', email: 'test@test.com' }
}) => {
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
