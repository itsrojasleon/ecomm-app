import React, { createContext, useReducer } from 'react';
import { ecomm } from '../../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'ProductsContext';

const productsActions = {
  isLoading: 'is_loading',
  error: 'error',
  fetchProducts: 'fetch_products',
  createProduct: 'create_product'
};

const initialState = {
  products: [],
  error: [],
  isLoading: false
};

const productsReducer = (state, { type, payload }) => {
  switch (type) {
    case productsActions.isLoading:
      return { ...state, isLoading: true };
    case productsActions.error:
      return { ...state, isLoading: false, error: payload };
    case productsActions.fetchProducts:
      return { ...state, isLoading: false, products: payload };
    case productsActions.createProduct:
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
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: productsActions.isLoading });
    try {
      const { data } = await ecomm.get('/api/products');
      dispatch({ type: productsActions.fetchProducts, payload: data });
    } catch (err) {
      dispatch({ type: productsActions.error, payload: err });
    }
  };

  const createProduct = async ({ name, price, description }) => {
    try {
      const { data } = await ecomm.post('/api/products', {
        name,
        price,
        description
      });
      dispatch({ type: productsActions.createProduct, payload: data });
    } catch (err) {
      dispatch({ type: productsActions.error, payload: err });
    }
  };

  const actions = { fetchProducts, createProduct };

  return (
    <Context.Provider value={{ state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
