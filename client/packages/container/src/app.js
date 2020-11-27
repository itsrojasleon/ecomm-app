import React, { lazy, Suspense, useState, useEffect, useContext } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/tailwind.css';
import { Context as AuthContext } from './context/auth';
import Nav from './components/nav';
const AuthApp = lazy(() => import('./components/auth-app'));
const ProductsApp = lazy(() => import('./components/products-app'));

const history = createBrowserHistory();

const App = () => {
  const {
    state: { currentUser },
    fetchUser,
    signup,
    signin,
    signout
  } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
  }, []);

  console.error(currentUser);

  return (
    <Router history={history}>
      <Nav currentUser={currentUser} onSignout={signout} />
      <div className="w-11/12 m-auto">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route path="/auth">
              <>
                {currentUser && <Redirect to="/" />}
                <AuthApp onSignin={signin} onSignup={signup} />
              </>
            </Route>
            <Route path="/products">
              <ProductsApp />
            </Route>
            <Route path="/">
              <h1 className="font-bold text-4xl">
                {currentUser
                  ? JSON.stringify(currentUser)
                  : "You're not authenticated"}
              </h1>
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
