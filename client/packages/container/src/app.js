import React, { lazy, Suspense, useEffect, useContext } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Nav from './components/nav';
import Footer from './components/footer';
import { Context } from './context/container-context';
import '../styles/tailwind.css';

const AuthApp = lazy(() => import('./components/auth-app'));
const ProductsApp = lazy(() => import('./components/products-app'));
const WishlistApp = lazy(() => import('./components/wishlist-app'));
const UsersApp = lazy(() => import('./components/users-app'));
const CartApp = lazy(() => import('./components/cart-app'));
const OrdersApp = lazy(() => import('./components/orders-app'));
const SearchApp = lazy(() => import('./components/search-app'));

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
    <div className="h-screen flex flex-col">
      <Router history={history}>
        <Nav />
        <div className="w-11/12 m-auto">
          <Suspense fallback={<h1>Loading...</h1>}>
            <Switch>
              <Route path="/auth">
                {currentUser && <Redirect to="/" />}
                <AuthApp />
              </Route>
              <Route path="/cart" component={CartApp} />
              <Route path="/orders" component={OrdersApp} />
              <Route path="/wishlist" component={WishlistApp} />
              <Route path="/users">
                <UsersApp currentUser={currentUser} />
              </Route>
              <Route path="/search">
                <SearchApp currentUser={currentUser} />
              </Route>
              <Route path="/">
                <ProductsApp currentUser={currentUser} />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Suspense>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
