import React, { createContext, useReducer } from 'react';
import { ecomm } from '../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'ContainerContext';

const containerActions = {
  fetchCurrentUser: 'fetch_current_user',
  isLoading: 'is_loading',
  error: 'error'
};

const initialState = {
  currentUser: null,
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
