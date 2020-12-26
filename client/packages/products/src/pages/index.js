import React, { useEffect, useContext } from 'react';
import { Title, Subtitle } from '@rlecomm/common';
import Product from '../components/product';
import SearchBar from '../components/search-bar';
import Alert from '../components/alert';
import { Context } from '../context/products';

const Products = () => {
  const { products, cart, fetchProducts } = useContext(Context);

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  // if (!products.length) return 'No products created';

  return (
    <>
      <Title>Products</Title>
      <Subtitle>Search your favorite product</Subtitle>
      <div className="grid sm:grid-cols-2 mb-6">
        <SearchBar />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
        {cart.map((product, i) => (
          <div
            key={product.id}
            className={`absolute bottom-0 right-0 mb-${20 * i + 4} mr-4`}>
            <Alert color="green">
              Product added to cart <b className="capitalize">{product.id}</b>
            </Alert>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
