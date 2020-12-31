import { ecomm } from '@rlecomm/common';
import { ACTION_TYPES } from './types';

const fetchProducts = (dispatch) => async ({ limit = 10, offset = 0 }) => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });

    const {
      data: { rows: products, count }
    } = await ecomm.get(`/api/products?limit=${limit}&offset=${offset}`);

    dispatch({
      type: ACTION_TYPES.fetchProducts,
      payload: { products, count }
    });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data.errors });
  }
};

const fetchProduct = (dispatch) => async (id) => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });

    const { data } = await ecomm.get(`/api/products/${id}`);

    dispatch({ type: ACTION_TYPES.fetchProduct, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data.errors });
  }
};

const fetchTopProductsByRating = (dispatch) => async () => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });

    const { data } = await ecomm.get('/api/products/resources/ratings');

    dispatch({ type: ACTION_TYPES.fetchTopProductsByRating, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data.errors });
  }
};

const createProduct = (dispatch) => async ({
  name,
  price,
  description,
  imageUrl
}) => {
  try {
    const { data } = await ecomm.post('/api/products', {
      name,
      price,
      description,
      imageUrl
    });
    dispatch({ type: ACTION_TYPES.createProduct, payload: data });
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

const addToWishlist = (dispatch) => async (productId) => {
  try {
    const { data } = await ecomm.post('/api/wishlist', { productId });
    dispatch({ type: ACTION_TYPES.addToWishlist, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data.errors });
  }
};

const createReview = (dispatch) => async ({
  productId,
  title,
  comment,
  score
}) => {
  try {
    const { data } = await ecomm.post('/api/reviews', {
      productId,
      title,
      comment,
      score
    });

    dispatch({ type: ACTION_TYPES.createReview, payload: data });
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.error,
      payload: err.response.data.errors
    });

    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.cleanError });
    }, 3000);
  }
};

const updateReview = (dispatch) => async (id, { title, comment, score }) => {
  try {
    const { data } = await ecomm.put(`/api/reviews/${id}`, {
      title,
      comment,
      score
    });

    dispatch({ type: ACTION_TYPES.updateReview, payload: { id, data } });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data.errors });
  }
};

const removeReview = (dispatch) => async (id) => {
  try {
    await ecomm.delete(`/api/reviews/${id}`);

    dispatch({ type: ACTION_TYPES.removeReview, payload: id });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data.errors });
  }
};

export {
  fetchProducts,
  fetchTopProductsByRating,
  fetchProduct,
  createProduct,
  addToCart,
  addToWishlist,
  createReview,
  updateReview,
  removeReview
};
