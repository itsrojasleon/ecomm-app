import React, { createContext, useReducer } from 'react';
import { ecomm } from '../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'WishlistContext';

export const ACTION_TYPES = {
  isLoading: 'IS_LOADING',
  error: 'ERROR',
  addToWishlist: 'ADD_TO_WISHLIST'
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true };
    case ACTION_TYPES.error:
      return { ...state, isLoading: false, error: payload };
    case ACTION_TYPES.addToWishlist:
      return { ...state, wishlist: payload };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    wishlist: null,
    error: [],
    isLoading: false
  });

  const addToWishlist = async (productId) => {
    try {
      const { data } = await ecomm.post('/api/wishlist', { productId });
      dispatch({ type: ACTION_TYPES.addToWishlist, payload: data });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
    }
  };

  const actions = { addToWishlist };

  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
