import React, { createContext, useReducer } from 'react';
import { ecomm } from '@rlecomm/common';

export const Context = createContext(null);
Context.displayName = 'WishlistContext';

const ACTION_TYPES = {
  fetchWishlist: 'FETCH_WISHLIST',
  removeFromWishlist: 'REMOVE_FROM_WISHLIST',
  addToCart: 'ADD_TO_CART',
  isLoading: 'IS_LOADING',
  error: 'ERROR'
};

const initialState = {
  wishlist: [],
  error: [],
  isLoading: false
};

const wishlistReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true };
    case ACTION_TYPES.error:
      return { ...state, isLoading: false, error: payload };
    case ACTION_TYPES.fetchWishlist:
      return { ...state, wishlist: payload, isLoading: false };
    case ACTION_TYPES.removeFromWishlist:
      return {
        ...state,
        wishlist: state.wishlist.filter((wish) => wish.product.id !== payload)
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const fetchWishlist = async () => {
    try {
      const { data } = await ecomm.get('/api/wishlist');

      dispatch({ type: ACTION_TYPES.fetchWishlist, payload: data });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err });
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await ecomm.post('/api/wishlist', { productId });

      dispatch({
        type: ACTION_TYPES.removeFromWishlist,
        payload: productId
      });
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
      dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
    }
  };

  const actions = { fetchWishlist, removeFromWishlist, addToCart };

  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
