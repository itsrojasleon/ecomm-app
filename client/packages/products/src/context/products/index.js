import React, { createContext, useReducer } from 'react';
import { ecomm } from '../../api/ecomm';
import { ACTION_TYPES } from './types';
import { reducer } from './reducer';

export const Context = createContext(null);
Context.displayName = 'ProductsContext';

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    product: null,
    cart: [],
    wishlist: null,
    error: [],
    isLoading: false
  });

  const fetchProducts = async () => {
    dispatch({ type: ACTION_TYPES.isLoading });
    try {
      const { data } = await ecomm.get('/api/products');
      dispatch({ type: ACTION_TYPES.fetchProducts, payload: data });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err });
    }
  };

  const fetchProduct = async (id) => {
    dispatch({ type: ACTION_TYPES.isLoading });
    try {
      const { data } = await ecomm.get(`/api/products/${id}`);
      dispatch({ type: ACTION_TYPES.fetchProduct, payload: data });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err });
    }
  };

  const createProduct = async ({ name, price, description }) => {
    try {
      const { data } = await ecomm.post('/api/products', {
        name,
        price,
        description
      });
      dispatch({ type: ACTION_TYPES.createProduct, payload: data });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err });
    }
  };

  const addToCart = async (productId) => {
    try {
      const { data } = await ecomm.post('/api/cart', {
        productId,
        quantity: 1
      });

      dispatch({ type: ACTION_TYPES.addToCart, payload: data });

      setTimeout(() => {
        dispatch({ type: ACTION_TYPES.removeFromCart });
      }, 3000);
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err });
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const { data } = await ecomm.post('/api/wishlist', { productId });
      dispatch({ type: ACTION_TYPES.addToWishlist, payload: data });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err });
    }
  };

  const createReview = async ({ productId, title, comment, score }) => {
    try {
      const { data } = await ecomm.post('/api/reviews', {
        productId,
        title,
        comment,
        score
      });

      dispatch({ type: ACTION_TYPES.createReview, payload: data });
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.error,
        payload: err.response.data.errors
      });

      setTimeout(() => {
        dispatch({ type: ACTION_TYPES.cleanError });
      }, 3000);
    }
  };

  const updateReview = async (id, { title, comment, score }) => {
    try {
      const { data } = await ecomm.put(`/api/reviews/${id}`, {
        title,
        comment,
        score
      });

      dispatch({ type: ACTION_TYPES.updateReview, payload: { id, data } });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err });
    }
  };

  const removeReview = async (id) => {
    try {
      await ecomm.delete(`/api/reviews/${id}`);

      dispatch({ type: ACTION_TYPES.removeReview, payload: id });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err });
    }
  };

  const actions = {
    fetchProducts,
    createProduct,
    fetchProduct,
    addToCart,
    addToWishlist,
    createReview,
    removeReview,
    updateReview
  };

  return (
    <Context.Provider value={{ state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
