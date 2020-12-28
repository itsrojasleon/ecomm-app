import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/product';
import Sidebar from '../components/sidebar';
import { Context } from '../context/search';
import { Title, Subtitle } from '@rlecomm/common';

const Search = () => {
  const { term } = useParams();
  const { isLoading, products, reset, searchProducts } = useContext(Context);

  useEffect(() => {
    searchProducts(term);
  }, [term, reset]);

  if (isLoading) return 'Loading products...';

  return (
    <>
      <Title>Search</Title>
      <Subtitle>
        {products.length === 0
          ? 'No products found'
          : `These are some products using "${term}"`}
      </Subtitle>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="">
          <Sidebar />
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
