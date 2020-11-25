import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/tailwind.css';
import { instagramClone } from '../api/instagram-clone';
import Nav from './components/nav';
const AuthApp = lazy(() => import('./components/auth-app'));

const history = createBrowserHistory();

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { currentUser }
      } = await instagramClone.get('/api/users/currentuser');

      setCurrentUser(currentUser);
    };

    fetchUser();
  }, []);

  return (
    <Router history={history}>
      <Nav currentUser={currentUser} />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/auth">
            <>
              {currentUser && <Redirect to="/" />}
              <AuthApp />
            </>
          </Route>
          <Route exact path="/">
            <div>{JSON.stringify(currentUser)}</div>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
