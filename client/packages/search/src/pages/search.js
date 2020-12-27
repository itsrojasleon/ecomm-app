import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/product';
import { Context } from '../context/search';
import { Title, Subtitle } from '@rlecomm/common';

const Search = () => {
  const { term } = useParams();
  const { products, searchProducts } = useContext(Context);

  useEffect(() => {
    searchProducts(term);
  }, [term]);

  return (
    <>
      <Title>Search</Title>
      <Subtitle>
        {products.length === 0
          ? 'No products found'
          : `These are some products using "${term}"`}
      </Subtitle>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

export default Search;
