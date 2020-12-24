import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Wishlist from './pages/wishlist';
import { Provider } from './context/wishlist';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Provider>
      <Router history={history}>
        <Switch>
          <Route path="/wishlist" component={Wishlist} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
