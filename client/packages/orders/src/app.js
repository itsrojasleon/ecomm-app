import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Orders from './pages/orders';
import { Provider } from './context/orders';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Provider>
      <Router history={history}>
        <Switch>
          <Route path="/orders" component={Orders} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
