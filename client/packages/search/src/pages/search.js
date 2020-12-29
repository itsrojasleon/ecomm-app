import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/product';
import Sidebar from '../components/sidebar';
import Pagination from '../components/pagination';
import { Context } from '../context/search';
import { Title, Subtitle } from '@rlecomm/common';

const LIMIT = 10;

const Search = () => {
  const { term } = useParams();
  const { isLoading, products, reset, count, searchProducts } = useContext(
    Context
  );
  const [index, setCurrentIndex] = useState(0);

  useEffect(() => {
    searchProducts({ term, limit: LIMIT, offset: LIMIT * index });
  }, [term, reset, index]);

  return (
    <>
      <Title>Search</Title>
      <Subtitle>
        {products.length === 0
          ? 'No products found'
          : `These are ${products.length} products of ${count} using the term "${term}"`}
      </Subtitle>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div className="lg:pr-4">
          <Sidebar />
        </div>
        <div className="col-span-3 border-l lg:pl-4">
          {isLoading ? (
            <p className="text-6xl">Loading...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Product key={product.id} {...product} />
                ))}
              </div>
              <div className="flex my-5">
                <Pagination
                  count={Math.ceil(count / LIMIT)}
                  setCurrentIndex={setCurrentIndex}
                  index={index}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
