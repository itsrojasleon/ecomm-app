import { ACTION_TYPES } from './types';
import { ecomm } from '../../api/ecomm';

const fetchOrders = (dispatch) => async () => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });
    const { data } = await ecomm.get('/api/orders');

    dispatch({ type: ACTION_TYPES.fetchOrders, payload: data });
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

export { fetchOrders, fetchOrder };
