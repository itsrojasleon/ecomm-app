import React, { useEffect, useState } from 'react';
import Product from '../components/product';
import { ecomm } from '../../api/ecomm';

const Wishlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await ecomm.get('/api/wishlist');

        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlist();
  }, []);

  if (products.length === 0) return 'No products added to the wishlist';

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {products.map(({ id, product }) => (
        <Product key={id} {...product} />
      ))}
    </div>
  );
};

export default Wishlist;
