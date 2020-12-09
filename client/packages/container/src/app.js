import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Nav from './components/nav';
import { ecomm } from '../api/ecomm';
import '../styles/tailwind.css';

const AuthApp = lazy(() => import('./components/auth-app'));
const ProductsApp = lazy(() => import('./components/products-app'));
const WishlistApp = lazy(() => import('./components/wishlist-app'));
const UsersApp = lazy(() => import('./components/users-app'));
const CartApp = lazy(() => import('./components/cart-app'));

// const history = createBrowserHistory();

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await ecomm.get('/api/users/currentuser');

      setCurrentUser(data.currentUser);
    };

    fetchUser();
  }, []);

  const handleSignout = async () => {
    await ecomm.post('/api/users/signout');
  };

  return (
    <BrowserRouter>
      <Nav currentUser={currentUser} onSignout={handleSignout} />
      <div className="w-11/12 m-auto">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route path="/auth">
              {currentUser && <Redirect to="/" />}
              <AuthApp />
            </Route>
            <Route path="/products" component={ProductsApp} />
            <Route path="/cart" component={CartApp} />
            <Route path="/wishlist" component={WishlistApp} />

            <Route path="/users">
              <UsersApp currentUser={currentUser} />
            </Route>
            <Route exact path="/">
              <div>Home</div>
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
