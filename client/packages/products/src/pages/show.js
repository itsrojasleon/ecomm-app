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

  if (state.errors?.length) {
    return (
      <>
        {state.errors.map((error, i) => (
          <div key={i}>{error.message}</div>
        ))}
      </>
    );
  }

  if (Object.values(state.product).length === 0) return <div>No product</div>;

  return <Product {...state.product} />;
};

export default Show;
