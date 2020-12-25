import React, { createContext, useReducer } from 'react';
import { ecomm } from '@rlecomm/common';

export const Context = createContext(null);
Context.displayName = 'UsersContext';

const ACTION_TYPES = {
  fetchUser: 'FETCH_USER',
  updateUser: 'UPDATE_USER',
  isLoading: 'IS_LOADING',
  error: 'ERROR'
};

const initialState = {
  user: null,
  error: [],
  isLoading: false
};

const usersReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.fetchUser:
      return { ...state, user: payload, isLoading: false };
    case ACTION_TYPES.updateUser:
      const { bio, name } = payload;
      return {
        ...state,
        user: { ...state.user, bio, name }
      };
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true };
    case ACTION_TYPES.error:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  const fetchUser = async (username) => {
    try {
      const { data } = await ecomm.get(`/api/users/${username}`);
      dispatch({ type: ACTION_TYPES.fetchUser, payload: data });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err });
    }
  };

  const updateUser = async ({ bio, name }) => {
    try {
      await ecomm.put(`/api/users`, { bio, name });
      dispatch({ type: ACTION_TYPES.updateUser, payload: { bio, name } });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err });
    }
  };

  const signout = async () => {
    try {
      await ecomm.post('/api/users/signout');
    } catch (err) {
      dispatch({ type: containerActions.error, payload: err });
    }
  };

  const actions = { fetchUser, updateUser, signout };

  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
