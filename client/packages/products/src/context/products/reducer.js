import { ACTION_TYPES } from './types';

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true };
    case ACTION_TYPES.error:
      return { ...state, isLoading: false, error: payload };
    case ACTION_TYPES.fetchProducts:
      return {
        ...state,
        isLoading: false,
        products: payload.products,
        count: payload.count
      };
    case ACTION_TYPES.fetchTopProductsByRating:
      return {
        ...state,
        isLoading: false,
        topProductsByRating: payload
      };
    case ACTION_TYPES.fetchProduct:
      return { ...state, isLoading: false, product: payload };
    case ACTION_TYPES.createProduct:
      return {
        ...state,
        isLoading: false,
        products: state.products.concat(payload)
      };
    case ACTION_TYPES.addToCart:
      return {
        ...state,
        cart: state.cart.concat(payload),
        products: state.products.map((product) => {
          return product.id === payload.productId
            ? { ...product, addedToCart: !product?.addedToCart }
            : product;
        })
      };
    case ACTION_TYPES.removeFromCart:
      return { ...state, cart: state.cart.slice(1) };
    case ACTION_TYPES.addToWishlist:
      return { ...state, wishlist: payload };
    case ACTION_TYPES.createReview:
      return {
        ...state,
        product: {
          ...state.product,
          reviews: state.product.reviews.concat(payload)
        }
      };
    case ACTION_TYPES.updateReview:
      return {
        ...state,
        product: {
          ...state.product,
          reviews: state.product.reviews.map((review) => {
            return review.id === payload.id
              ? {
                  ...review,
                  ...payload.data
                }
              : review;
          })
        }
      };
    case ACTION_TYPES.removeReview:
      return {
        ...state,
        product: {
          ...state.product,
          reviews: state.product.reviews.filter(
            (review) => review.id !== payload
          )
        }
      };
    default:
      return state;
  }
};
