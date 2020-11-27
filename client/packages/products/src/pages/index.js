import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return <div>{JSON.stringify(products)}</div>;
};

export default Products;
