import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Create from './pages/create';
import Show from './pages/show';
import Products from './pages';
import { Provider as ProductsProvider } from './context/products';
import { Provider as CartProvider } from './context/cart';
import { Provider as WishlistProvider } from './context/wishlist';
import { Provider as ReviewsProvider } from './context/reviews';
import '../styles/tailwind.css';

const App = ({ history, currentUser }) => {
  return (
    <ProductsProvider>
      <CartProvider>
        <WishlistProvider>
          <ReviewsProvider>
            <Router history={history}>
              <Switch>
                <Route path="/products/create" component={Create} />
                <Route path="/products/:id">
                  <Show currentUser={currentUser} />
                </Route>
                <Route path="/products" component={Products} />
              </Switch>
            </Router>
          </ReviewsProvider>
        </WishlistProvider>
      </CartProvider>
    </ProductsProvider>
  );
};

export default App;
