import { ACTION_TYPES } from './types';
import { ecomm } from '../../api/ecomm';

const fetchItems = (dispatch) => async () => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });
    const { data } = await ecomm.get('/api/cart');
    dispatch({ type: ACTION_TYPES.fetchItems, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err });
  }
};

const removeItem = (dispatch) => async (id) => {
  try {
    await ecomm.delete(`/api/cart/${id}`);
    dispatch({ type: ACTION_TYPES.removeItem, payload: id });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err });
  }
};

const removeAll = (dispatch) => async () => {
  try {
    await ecomm.delete('/api/cart');
    dispatch({ type: ACTION_TYPES.removeAll });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err });
  }
};

// Increase product's quantity by one
const increase = (dispatch) => async (id) => {
  try {
    await ecomm.put(`/api/cart/increase/${id}`);
    dispatch({ type: ACTION_TYPES.increase, payload: id });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err });
  }
};

// Decrease product's quantity by one
const decrease = (dispatch) => async (id) => {
  try {
    await ecomm.put(`/api/cart/decrease/${id}`);
    dispatch({ type: ACTION_TYPES.decrease, payload: id });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err });
  }
};

const makeOrder = (dispatch) => async ({ total, items }) => {
  try {
    const {
      data: { id }
    } = await ecomm.post('/api/orders', { total });

    for (let { productId, quantity } of items) {
      await ecomm.post('/api/order-details', {
        orderId: id,
        productId,
        quantity
      });
    }
  } catch (err) {
    dispatch({ type: ACTION_TYPES.makeOrder, payload: err.response.data });
  }
};

export { fetchItems, removeItem, increase, decrease, removeAll };
