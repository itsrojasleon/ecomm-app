import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/product';
import Sidebar from '../components/sidebar';
import { Context } from '../context/search';
import { Title, Subtitle } from '@rlecomm/common';

const Search = () => {
  const { term } = useParams();
  const { isLoading, products, searchProducts } = useContext(Context);

  useEffect(() => {
    searchProducts(term);
  }, [term]);

  if (isLoading) return 'Loading products...';

  return (
    <>
      <Title>Search</Title>
      <Subtitle>
        {products.length === 0
          ? 'No products found'
          : `These are some products using "${term}"`}
      </Subtitle>
      <div className="flex">
        <div className="w-2/12">
          <Sidebar />
        </div>
        <div className="flex gap-4 w-10/12">
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
