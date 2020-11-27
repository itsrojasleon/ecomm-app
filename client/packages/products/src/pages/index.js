import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../components/product-item';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:4000/api/products', {
        withCredentials: true
      });

      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Products;
