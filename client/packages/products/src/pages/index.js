import React, { useState, useEffect, useContext } from 'react';
import { Title, Subtitle } from '@rlecomm/common';
import Product from '../components/product';
import Alert from '../components/alert';
import Pagination from '../components/pagination';
import { Context } from '../context/products';

const LIMIT = 10;

const Products = () => {
  const {
    products,
    count,
    cart,
    topProductsByRating,
    fetchProducts,
    fetchTopProductsByRating
  } = useContext(Context);
  const [index, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProducts({ limit: LIMIT, offset: LIMIT * index });
    fetchTopProductsByRating();
  }, [index]);

  return (
    <>
      <Title>{!products.length ? 'No products' : 'Products'}</Title>
      {topProductsByRating.length ? <Subtitle>Top products</Subtitle> : null}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-4">
        {topProductsByRating.map((product) => (
          <div
            key={product.id}
            className="bg-yellow-50 p-2 border border-gray-100 rounded">
            <Product {...product} />
          </div>
        ))}
      </div>
      {products.length ? <Subtitle>List of products</Subtitle> : null}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      {products.length !== 0 && (
        <div className="flex my-5">
          <Pagination
            count={Math.ceil(count / LIMIT)}
            setCurrentIndex={setCurrentIndex}
            index={index}
          />
        </div>
      )}
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
