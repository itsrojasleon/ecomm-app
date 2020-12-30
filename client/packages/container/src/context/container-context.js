import React, { createContext, useReducer } from 'react';
import { ecomm } from '@rlecomm/common';

export const Context = createContext(null);
Context.displayName = 'ContainerContext';

const containerActions = {
  fetchCurrentUser: 'FETCH_CURRENT_USER',
  isLoading: 'IS_LOADING',
  error: 'ERROR'
};

const initialState = {
  currentUser: null,
  products: [],
  error: null,
  isLoading: false
};

const containerReducer = (state, { type, payload }) => {
  switch (type) {
    case containerActions.fetchCurrentUser:
      return { ...state, currentUser: payload, isLoading: false };
    case containerActions.isLoading:
      return { ...state, isLoading: true, error: null };
    case containerActions.error:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(containerReducer, initialState);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await ecomm.get('/api/users/currentuser');
      dispatch({
        type: containerActions.fetchCurrentUser,
        payload: data.currentUser
      });
    } catch (err) {
      dispatch({ type: containerActions.error, payload: err });
    }
  };

  const actions = { fetchCurrentUser };

  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
