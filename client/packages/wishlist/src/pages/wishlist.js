import React, { useEffect, useContext } from 'react';
import Product from '../components/product';
import { Context } from '../context/wishlist-context';

const Wishlist = () => {
  const { state, fetchWishlist } = useContext(Context);

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (state.isLoading) return <div>Loading...</div>;
  if (state.wishlist.length === 0) return 'No products added to the wishlist';

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {state.wishlist.map(({ id, product }) => (
        <Product key={id} {...product} />
      ))}
    </div>
  );
};

export default Wishlist;
