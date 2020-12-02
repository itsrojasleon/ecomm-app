import React, { useEffect, useState } from 'react';
import ProductItem from '../components/product-item';
import { ecomm } from '../../api/ecomm';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await ecomm.get('/api/products/wishlist');

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
