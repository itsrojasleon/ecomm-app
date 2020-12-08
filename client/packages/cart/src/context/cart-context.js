import React, { createContext, useReducer } from 'react';
import { ecomm } from '../../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'CartContext';

const cartActions = {
  fetchItems: 'fetch_items',
  removeItem: 'remove_item',
  increase: 'increase',
  isLoading: 'is_loading',
  error: 'error'
};

const initialState = {
  items: [],
  error: [],
  isLoading: false
};

const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case cartActions.fetchItems:
      return { ...state, isLoading: false, items: payload };
    case cartActions.isLoading:
      return { ...state, isLoading: true };
    case cartActions.removeItem:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload)
      };
    case cartActions.increase:
      return {
        ...state,
        items: state.items.map((item) => {
          return item.id === payload
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        })
      };
    case cartActions.error:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

const fetchItems = (dispatch) => async () => {
  try {
    dispatch({ type: cartActions.isLoading });
    const { data } = await ecomm.get('/api/cart');
    dispatch({ type: cartActions.fetchItems, payload: data });
  } catch (err) {
    dispatch({ type: cartActions.error, payload: err });
  }
};

const removeItem = (dispatch) => async (id) => {
  try {
    await ecomm.delete(`/api/cart/${id}`);
    dispatch({ type: cartActions.removeItem, payload: id });
  } catch (err) {
    dispatch({ type: cartActions.error, payload: err });
  }
};

// Increase product's quantity by one
const increase = (dispatch) => async (id) => {
  try {
    await ecomm.put(`/api/cart/${id}`);
    dispatch({ type: cartActions.increase, payload: id });
  } catch (err) {
    dispatch({ type: cartActions.error, payload: err });
  }
};

const actions = { fetchItems, removeItem, increase };

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const boundActions = {};

  for (let key in actions) {
    boundActions[key] = actions[key](dispatch);
  }

  return (
    <Context.Provider value={{ state, ...boundActions }}>
      {children}
    </Context.Provider>
  );
};
