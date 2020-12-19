import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Orders from './pages/orders';
import Order from './pages/order';
import { Provider } from './context/orders';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Provider>
      <Router history={history}>
        <Switch>
          <Route exact path="/orders" component={Orders} />
          <Route path="/orders/:id" component={Order} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
