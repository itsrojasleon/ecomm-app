import React, { lazy, Suspense, useEffect, useContext } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Nav from './components/nav';
import { Context } from './context/container-context';
import '../styles/tailwind.css';

const AuthApp = lazy(() => import('./components/auth-app'));
const ProductsApp = lazy(() => import('./components/products-app'));
const WishlistApp = lazy(() => import('./components/wishlist-app'));
const UsersApp = lazy(() => import('./components/users-app'));
const CartApp = lazy(() => import('./components/cart-app'));

const history = createBrowserHistory();

const App = () => {
  const { currentUser, isLoading, error, fetchCurrentUser } = useContext(
    Context
  );

  useEffect(() => {
    fetchCurrentUser();

    const unlisten = history.listen(() => {
      fetchCurrentUser();
    });

    return () => {
      unlisten();
    };
  }, []);

  if (isLoading) return 'LOADING...';
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <Router history={history}>
      <Nav />
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
              <UsersApp />
            </Route>
            <Route exact path="/">
              <h1>Home</h1>
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
