import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/cart">
          <div>CART</div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;