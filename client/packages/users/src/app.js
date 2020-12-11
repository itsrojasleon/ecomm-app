import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import User from './pages/user';
import { Provider } from './context/users-context';
import '../styles/tailwind.css';

const App = ({ history }) => {
  return (
    <Provider>
      <Router history={history}>
        <Switch>
          <Route path="/users/:username" component={User} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
