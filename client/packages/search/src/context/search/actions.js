import { ecomm } from '@rlecomm/common';
import { ACTION_TYPES } from './types';

const searchProducts = (dispatch) => async (term) => {
  try {
    dispatch({ type: ACTION_TYPES.isLoading });

    const { data } = await ecomm.get(`/api/search?term=${term}`);

    dispatch({ type: ACTION_TYPES.searchProducts, payload: data });
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

export { searchProducts, filterByPrices, resetSearch };
