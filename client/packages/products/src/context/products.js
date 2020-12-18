import React, { createContext, useReducer } from 'react';
import { ecomm } from '../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'ProductsContext';

const ACTION_TYPES = {
  isLoading: 'IS_LOADING',
  error: 'ERROR',
  fetchProducts: 'FETCH_PRODUCTS',
  fetchProduct: 'FETCH_PRODUCT',
  createProduct: 'CREATE_PRODUCT'
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true };
    case ACTION_TYPES.error:
      return { ...state, isLoading: false, error: payload };
    case ACTION_TYPES.cleanError:
      return { ...state, isLoading: false, error: state.error.slice(1) };
    case ACTION_TYPES.fetchProducts:
      return { ...state, isLoading: false, products: payload };
    case ACTION_TYPES.fetchProduct:
      return { ...state, isLoading: false, product: payload };
    case ACTION_TYPES.createProduct:
      return {
        ...state,
        isLoading: false,
        products: state.products.concat(payload)
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    product: null,
    wishlist: null,
    error: [],
    isLoading: false
  });

  const fetchProducts = async () => {
    try {
      dispatch({ type: ACTION_TYPES.isLoading });

      const { data } = await ecomm.get('/api/products');

      dispatch({ type: ACTION_TYPES.fetchProducts, payload: data });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
    }
  };

  const fetchProduct = async (id) => {
    try {
      dispatch({ type: ACTION_TYPES.isLoading });

      const { data } = await ecomm.get(`/api/products/${id}`);

      dispatch({ type: ACTION_TYPES.fetchProduct, payload: data });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
    }
  };

  const createProduct = async ({ name, price, description }) => {
    try {
      const { data } = await ecomm.post('/api/products', {
        name,
        price,
        description
      });
      dispatch({ type: ACTION_TYPES.createProduct, payload: data });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
    }
  };

  const actions = {
    fetchProducts,
    fetchProduct,
    createProduct
  };

  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
