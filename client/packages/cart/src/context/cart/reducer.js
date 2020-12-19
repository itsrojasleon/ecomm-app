import { ACTION_TYPES } from './types';

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true };
    case ACTION_TYPES.error:
      return { ...state, error: payload, isLoading: false };
    case ACTION_TYPES.fetchItems:
      return { ...state, items: payload, isLoading: false };
    case ACTION_TYPES.removeItem:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload)
      };
    case ACTION_TYPES.removeAll:
      return { ...state, items: [] };
    case ACTION_TYPES.increase:
      return {
        ...state,
        items: state.items.map((item) => {
          return item.id === payload
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        })
      };
    case ACTION_TYPES.decrease:
      return {
        ...state,
        items: state.items.map((item) => {
          // Do nothing if quantity is less than 1
          if (item.quantity < 1) return;
          return item.id === payload
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        })
      };
    default:
      return state;
  }
};
