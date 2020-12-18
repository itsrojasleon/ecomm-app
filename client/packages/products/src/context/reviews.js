import React, { createContext, useReducer } from 'react';
import { ecomm } from '../api/ecomm';

export const Context = createContext(null);
Context.displayName = 'ReviewsContext';

const ACTION_TYPES = {
  isLoading: 'IS_LOADING',
  error: 'ERROR',
  cleanError: 'CLEAN_ERROR',
  createReview: 'CREATE_REVIEW',
  updateReview: 'UPDATE_REVIEW',
  removeReview: 'REMOVE_REVIEW'
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.isLoading:
      return { ...state, isLoading: true };
    case ACTION_TYPES.error:
      return { ...state, isLoading: false, error: payload };
    case ACTION_TYPES.cleanError:
      return { ...state, isLoading: false, error: state.error.slice(1) };
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

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    product: null,
    wishlist: null,
    error: [],
    isLoading: false
  });

  const createReview = async ({ productId, title, comment, score }) => {
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

  const updateReview = async (id, { title, comment, score }) => {
    try {
      const { data } = await ecomm.put(`/api/reviews/${id}`, {
        title,
        comment,
        score
      });

      dispatch({ type: ACTION_TYPES.updateReview, payload: { id, data } });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
    }
  };

  const removeReview = async (id) => {
    try {
      await ecomm.delete(`/api/reviews/${id}`);

      dispatch({ type: ACTION_TYPES.removeReview, payload: id });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.error, payload: err.response.data });
    }
  };

  const actions = {
    createReview,
    updateReview,
    removeReview
  };

  return (
    <Context.Provider value={{ ...state, ...actions }}>
      {children}
    </Context.Provider>
  );
};
