import { ACTION_TYPES } from './types';
import { ecomm } from '../../api/ecomm';

const fetchCreatedOrders = (dispatch) => async () => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });

    const { data } = await ecomm.get('/api/orders?status=created');

    dispatch({ type: ACTION_TYPES.fetchCreatedOrders, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
  }
};

const fetchCompletedOrders = (dispatch) => async () => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });

    const { data } = await ecomm.get('/api/orders?status=completed');

    dispatch({ type: ACTION_TYPES.fetchCompletedOrders, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
  }
};

const fetchCancelledOrders = (dispatch) => async () => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });
    const { data } = await ecomm.get('/api/orders?status=cancelled');

    dispatch({ type: ACTION_TYPES.fetchCancelledOrders, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
  }
};

const fetchOrder = (dispatch) => async (id) => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });

    const { data } = await ecomm.get(`/api/orders/${id}`);

    dispatch({ type: ACTION_TYPES.fetchOrder, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
  }
};

const cancelOrder = (dispatch) => async (id) => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });

    await ecomm.post(`/api/orders/${id}`);

    dispatch({ type: ACTION_TYPES.cancelOrder, payload: id });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
  }
};

const makePayment = (dispatch) => async ({ token, orderId }) => {
  try {
    const { data } = await ecomm.post('/api/payments', { token, orderId });
    dispatch({ type: ACTION_TYPES.makePayment, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
  }
};

export {
  fetchCreatedOrders,
  fetchCompletedOrders,
  fetchCancelledOrders,
  fetchOrder,
  cancelOrder,
  makePayment
};
