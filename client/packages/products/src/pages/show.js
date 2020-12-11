import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/product';
import { Context } from '../context/products-context';

const Show = () => {
  const { id } = useParams();
  const { state, fetchProduct } = useContext(Context);

  useEffect(() => {
    fetchProduct(id);
  }, []);

  if (state.errors) {
    return (
      <>
        {state.errors.map((error, i) => (
          <div key={i}>{error.message}</div>
        ))}
      </>
    );
  }

  if (state.isLoading) return 'LOADING PRODUCT...';
  if (!state.product) return 'Product not found';

  return (
    <>
      <Product {...state.product} />
    </>
  );
};

export default Show;
