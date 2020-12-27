import { ecomm } from '@rlecomm/common';
import { ACTION_TYPES } from './types';

const searchProducts = (dispatch) => async (term) => {
  dispatch({ type: ACTION_TYPES.isLoading });
  try {
    const { data } = await ecomm.get(`/api/search?term=${term}`);
    dispatch({ type: ACTION_TYPES.searchProducts, payload: data });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.error, payload: err.response.data.errors });
  }
};

export { searchProducts };
