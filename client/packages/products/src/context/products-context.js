import React, { createContext, useReducer } from 'react';
import { ecomm } from '../../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'ProductsContext';

const productsActions = {
  isLoading: 'is_loading',
  error: 'error',
  fetchProducts: 'fetch_products',
  fetchProduct: 'fetch_product',
  createProduct: 'create_product',
  addToCart: 'add_to_cart',
  addToWishlist: 'add_to_wishlist'
};

const initialState = {
  products: [],
  product: {},
  cart: {},
  wishlist: {},
  error: [],
  isLoading: false
};

const productsReducer = (state, { type, payload }) => {
  switch (type) {
    case productsActions.isLoading:
      return { ...state, isLoading: true };
    case productsActions.error:
      return { ...state, isLoading: false, error: payload };
    case productsActions.fetchProducts:
      return { ...state, isLoading: false, products: payload, error: [] };
    case productsActions.fetchProduct:
      return { ...state, isLoading: false, product: payload, error: [] };
    case productsActions.createProduct:
      return {
        ...state,
        isLoading: false,
        products: state.products.concat(payload)
      };
    case productsActions.addToCart:
      return { ...state, cart: payload };
    case productsActions.addToCart:
      return { ...state, wishlist: payload };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: productsActions.isLoading });
    try {
      const { data } = await ecomm.get('/api/products');
      dispatch({ type: productsActions.fetchProducts, payload: data });
    } catch (err) {
      dispatch({ type: productsActions.error, payload: err });
    }
  };

  const fetchProduct = async (id) => {
    dispatch({ type: productsActions.isLoading });
    try {
      const { data } = await ecomm.get(`/api/products/${id}`);
      dispatch({ type: productsActions.fetchProduct, payload: data });
    } catch (err) {
      dispatch({ type: productsActions.error, payload: err });
    }
  };

  const createProduct = async ({ name, price, description }) => {
    try {
      const { data } = await ecomm.post('/api/products', {
        name,
        price,
        description
      });
      dispatch({ type: productsActions.createProduct, payload: data });
    } catch (err) {
      dispatch({ type: productsActions.error, payload: err });
    }
  };

  const addToCart = async (productId) => {
    try {
      const { data } = await ecomm.post('/api/cart', {
        productId,
        quantity: 1
      });
      console.log(data);
      dispatch({ type: productsActions.addToCart, payload: data });
    } catch (err) {
      dispatch({ type: productsActions.error, payload: err });
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const { data } = await ecomm.post('/api/wishlist', { productId });
      dispatch({ type: productsActions.addToWishlist, payload: data });
    } catch (err) {
      dispatch({ type: productsActions.error, payload: err });
    }
  };

  const actions = {
    fetchProducts,
    createProduct,
    fetchProduct,
    addToCart,
    addToWishlist
  };

  return (
    <Context.Provider value={{ state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
