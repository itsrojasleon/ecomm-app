import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/wishlist">
          <div>wishlist</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
