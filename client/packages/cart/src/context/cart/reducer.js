import { ACTION_TYPES } from './types';

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.fetchItems:
      return { ...state, isLoading: false, items: payload };
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true, error: [] };
    case ACTION_TYPES.error:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
