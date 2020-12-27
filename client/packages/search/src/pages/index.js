import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/product';
import { Context } from '../context/search';

const A = () => {
  const { term } = useParams();
  const { products, searchProducts } = useContext(Context);

  useEffect(() => {
    searchProducts(term);
  }, [term]);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default A;
