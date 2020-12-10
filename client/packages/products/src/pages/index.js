import React, { useEffect, useContext } from 'react';
import Product from '../components/product';
import Alert from '../components/alert';
import { Context } from '../context/products-context';

const Products = () => {
  const { state, fetchProducts } = useContext(Context);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {state.products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
      {/* {JSON.stringify(state.cart)} */}
      <Alert />
    </div>
  );
};

export default Products;
