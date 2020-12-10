import React, { createContext, useReducer } from 'react';
import { ecomm } from '../../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'WishlistContext';

const wishlistActions = {
  fetchWishlist: 'fetch_wishlist',
  removeFromWishlist: 'remove_from_wishlist',
  isLoading: 'is_loading',
  error: 'error'
};

const initialState = {
  wishlist: [],
  error: [],
  isLoading: false
};

const wishlistReducer = (state, { type, payload }) => {
  switch (type) {
    case wishlistActions.isLoading:
      return { ...state, isLoading: true };
    case wishlistActions.error:
      return { ...state, isLoading: false, error: payload };
    case wishlistActions.fetchWishlist:
      return { ...state, wishlist: payload, isLoading: false };
    case wishlistActions.removeFromWishlist:
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
      dispatch({ type: wishlistActions.fetchWishlist, payload: data });
    } catch (err) {
      dispatch({ type: wishlistActions.error, payload: err });
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await ecomm.post('/api/wishlist', { productId });
      dispatch({
        type: wishlistActions.removeFromWishlist,
        payload: productId
      });
    } catch (err) {
      dispatch({ type: wishlistActions.error, payload: err });
    }
  };

  const actions = { fetchWishlist, removeFromWishlist };

  return (
    <Context.Provider value={{ state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
