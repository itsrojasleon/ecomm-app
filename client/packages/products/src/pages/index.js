import React, { useEffect, useContext } from 'react';
import Product from '../components/product';
import Alert from '../components/alert';
import { Context as ProductsContext } from '../context/products';
import { Context as CartContext } from '../context/cart';

const Products = () => {
  const { products, fetchProducts } = useContext(ProductsContext);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
      {cart.map((item, i) => (
        <div
          key={item.id}
          className={`absolute bottom-0 right-0 mb-${20 * i + 4} mr-4`}>
          <Alert color="green">
            Product added to cart <b className="capitalize">{item.id}</b>
          </Alert>
        </div>
      ))}
    </div>
  );
};

export default Products;
