import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Cart from './pages/cart';
import { Provider } from './context/cart-context';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Provider>
      <Router history={history}>
        <Switch>
          <Route path="/cart/fuck">
            <div>Fuck</div>
          </Route>
          <Route path="/cart" component={Cart} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
