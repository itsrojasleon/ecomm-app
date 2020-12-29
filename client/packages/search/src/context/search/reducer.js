import { ACTION_TYPES } from './types';

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true };
    case ACTION_TYPES.error:
      return { ...state, isLoading: false, error: payload };
    case ACTION_TYPES.searchProducts:
      return {
        ...state,
        isLoading: false,
        products: payload.products,
        count: payload.count
      };
    case ACTION_TYPES.filterByPrices:
      return {
        ...state,
        isLoading: false,
        products: state.products.filter(
          (product) =>
            product.price >= payload.min && product.price <= payload.max
        )
      };
    case ACTION_TYPES.reset:
      return { ...state, reset: !state.reset };
    default:
      return state;
  }
};
