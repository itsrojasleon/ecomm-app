import { ACTION_TYPES } from './types';

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.fetchOrders:
      return { ...state, orders: payload };
    default:
      return state;
  }
};
