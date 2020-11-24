import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/tailwind.css';
import Nav from './components/nav';
import NavItem from './components/nav-item';

const AuthApp = lazy(() => import('./components/auth-app'));

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Nav>
        <NavItem href="/auth/signup" isActive>
          Signup
        </NavItem>
        <NavItem href="/auth/signin">Signin</NavItem>
        <NavItem href="/auth/signout">Signout</NavItem>
      </Nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth">
            <AuthApp />
          </Route>
          <Route path="/">
            <div>Home page brother</div>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
