import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import * as actions from './actions';

export const Context = createContext(null);
Context.displayName = 'OrdersContext';

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    orders: [],
    order: [],
    error: [],
    isLoading: false
  });

  const boundActions = {};

  for (let key in actions) {
    boundActions[key] = actions[key](dispatch);
  }

  return (
    <Context.Provider value={{ ...state, ...boundActions }}>
      {children}
    </Context.Provider>
  );
};
