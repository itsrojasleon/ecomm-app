import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Create from './pages/create';
import Show from './pages/show';
import Products from './pages';
import { Provider } from './context/products';
import '../styles/tailwind.css';

const App = ({ history, currentUser }) => {
  return (
    <Provider>
      <Router history={history}>
        <Switch>
          <Route path="/products/create" component={Create} />
          <Route path="/products/:id">
            <Show currentUser={currentUser} />
          </Route>
          <Route path="/products" component={Products} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
