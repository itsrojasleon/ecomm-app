import { ACTION_TYPES } from './types';

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true };
    case ACTION_TYPES.error:
      return { ...state, isLoading: false, error: payload };
    case ACTION_TYPES.searchProducts:
      return { ...state, isLoading: false, products: payload };
    default:
      return state;
  }
};
