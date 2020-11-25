import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/users/:username">
          <div>user</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
