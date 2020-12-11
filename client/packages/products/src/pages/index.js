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
      {state.cart.map((product, i) => (
        <div
          key={product.id}
          className={`absolute bottom-0 right-0 mb-${20 * i + 4} mr-4`}>
          <Alert>
            Product added to cart <b className="capitalize">{product.id}</b>
          </Alert>
        </div>
      ))}
    </div>
  );
};

export default Products;
