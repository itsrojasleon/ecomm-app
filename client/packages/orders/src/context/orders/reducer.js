import { ACTION_TYPES } from './types';

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.fetchOrders:
      return { ...state, orders: payload, isLoading: false };
    case ACTION_TYPES.fetchOrder:
      return { ...state, order: payload, isLoading: false };
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true, error: [] };
    case ACTION_TYPES.error:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
