import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Search from './pages/search';
import { Provider } from './context/search';
import '../styles/tailwind.css';

const App = ({ history, currentUser }) => {
  return (
    <Provider>
      <Router history={history}>
        <Switch>
          <Route path="/search/:term" component={Search} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
