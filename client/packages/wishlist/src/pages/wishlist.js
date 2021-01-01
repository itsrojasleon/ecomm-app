import React, { useEffect, useContext } from 'react';
import { Title, Subtitle } from '@rlecomm/common';
import Product from '../components/product';
import { Context } from '../context/wishlist';

const Wishlist = () => {
  const { isLoading, wishlist, fetchWishlist } = useContext(Context);

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <>
      <Title>Wishlist</Title>
      <Subtitle>
        Here's your wishlist, make sure you buy a bunch of products
      </Subtitle>
      <Subtitle>
        You have <strong>{wishlist.length}</strong> items added to your wishlist
      </Subtitle>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {wishlist.map(({ id, product, user }) => (
            <Product key={id} {...product} user={user} />
          ))}
        </div>
      )}
    </>
  );
};

export default Wishlist;
