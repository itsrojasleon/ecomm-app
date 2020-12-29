import { ecomm } from '@rlecomm/common';
import { ACTION_TYPES } from './types';

const searchProducts = (dispatch) => async ({ term, limit, offset }) => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });

    const {
      data: { rows: products, count }
    } = await ecomm.get(
      `/api/search?term=${term}&limit=${limit}&offset=${offset}`
    );

    dispatch({
      type: ACTION_TYPES.searchProducts,
      payload: { products, count }
    });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data.errors });
  }
};

const filterByPrices = (dispatch) => ({ min, max }) => {
  dispatch({ type: ACTION_TYPES.filterByPrices, payload: { min, max } });
};

const resetSearch = (dispach) => () => {
  dispach({ type: ACTION_TYPES.reset });
};

const addToWishlist = (dispatch) => async (productId) => {
  try {
    const { data } = await ecomm.post('/api/wishlist', { productId });
    dispatch({ type: ACTION_TYPES.addToWishlist, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data.errors });
  }
};

const addToCart = (dispatch) => async (productId) => {
  try {
    const { data } = await ecomm.post('/api/cart', {
      productId,
      quantity: 1
    });

    dispatch({ type: ACTION_TYPES.addToCart, payload: data });

    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.removeFromCart });
    }, 3000);
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data.errors });
  }
};

export {
  searchProducts,
  filterByPrices,
  resetSearch,
  addToWishlist,
  addToCart
};
