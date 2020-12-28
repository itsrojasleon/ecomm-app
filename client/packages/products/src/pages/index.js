import React, { useEffect, useContext } from 'react';
import { Title, Subtitle } from '@rlecomm/common';
import Product from '../components/product';
import Alert from '../components/alert';
import Pagination from '../components/pagination';
import { Context } from '../context/products';

const Products = () => {
  const { products, count, cart, fetchProducts } = useContext(Context);

  useEffect(() => {
    fetchProducts({ limit: 10, offset: 0 });
  }, []);

  return (
    <>
      <Title>Products</Title>
      <Subtitle>List of products</Subtitle>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      <div className="flex my-5">
        <Pagination count={Math.ceil(count / 10)} />
      </div>
      {cart.map((product, i) => (
        <div
          key={product.id}
          className={`absolute bottom-0 right-0 mb-${20 * i + 4} mr-4`}>
          <Alert color="green">
            Product added to cart <b className="capitalize">{product.id}</b>
          </Alert>
        </div>
      ))}
    </>
  );
};

export default Products;
