import React, { createContext, useReducer } from 'react';
import { ecomm } from '../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'CartContext';

const ACTION_TYPES = {
  error: 'ERROR',
  addToCart: 'ADD_TO_CART',
  removeFromCart: 'REMOVE_FROM_CART'
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.error:
      return { ...state, isLoading: false, error: payload };
    case ACTION_TYPES.addToCart:
      return { ...state, cart: state.cart.concat(payload) };
    case ACTION_TYPES.removeFromCart:
      return { ...state, cart: state.cart.slice(1) };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
    error: [],
    isLoading: false
  });

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

  const actions = { addToCart };

  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
