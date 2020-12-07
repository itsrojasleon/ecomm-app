import React, { createContext, useReducer } from 'react';
import { ecomm } from '../../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'CartContext';

const cartActions = {
  fetchItems: 'fetch_items',
  removeItem: 'remove_item',
  isLoading: 'is_loading',
  error: 'error'
};

const initialState = {
  items: [],
  error: [],
  isLoading: false
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case cartActions.fetchItems:
      return { ...state, isLoading: false, items: action.payload };
    case cartActions.isLoading:
      return { ...state, isLoading: true };
    case cartActions.removeItem:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload)
      };
    case cartActions.error:
      return { ...state, error: action.payload, isLoading: false };
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

const actions = { fetchItems, removeItem };

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
