import React, { createContext, useReducer } from 'react';
import { ecomm } from '../../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'UsersContext';

const userActions = {
  fetchUser: 'fetch_user',
  updateUser: 'update_user',
  isLoading: 'is_loading',
  error: 'error'
};

const initialState = {
  user: null,
  currentUser: null,
  error: [],
  isLoading: false
};

const usersReducer = (state, { type, payload }) => {
  switch (type) {
    case userActions.fetchUser:
      return { ...state, user: payload, isLoading: false };
    case userActions.updateUser:
      const { bio, name } = payload;
      return {
        ...state,
        user: { ...state.user, bio, name }
      };
    case userActions.isLoading:
      return { ...state, isLoading: true };
    case userActions.error:
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
      dispatch({ type: userActions.fetchUser, payload: data });
    } catch (err) {
      dispatch({ type: userActions.error, payload: err });
    }
  };

  const updateUser = async ({ username, bio, name }) => {
    try {
      await ecomm.put(`/api/users/${username}`, { bio, name });
      dispatch({ type: userActions.updateUser, payload: { bio, name } });
    } catch (err) {
      dispatch({ type: userActions.error, payload: err });
    }
  };

  const actions = { fetchUser, updateUser };

  return (
    <Context.Provider value={{ state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
