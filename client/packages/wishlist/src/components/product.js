import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Added, formatMoney, S3_BUCKET_NAME } from '@rlecomm/common';
import { Context } from '../context/wishlist';

const Product = ({ id, name, price, description, imageUrl, user }) => {
  const { removeFromWishlist, addToCart } = useContext(Context);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCart = () => {
    addToCart(id).then(() => setAddedToCart(true));
  };

  const renderUserInfo = () => (
    <span className="mt-4">
      <span className="flex gap-1">
        <p>By</p>
        <Link
          className="hover:underline font-semibold"
          to={`/users/${user.username}`}>
          {user.username}
        </Link>
      </span>
    </span>
  );

  return (
    <div className="flex">
      <div className="flex-auto">
        <img className="rounded-xl" src={`${S3_BUCKET_NAME}/${imageUrl}`} />
        <div className="flex flex-wrap mt-3">
          <Link
            to={`/products/${id}`}
            className="flex-auto text-xl font-semibold">
            {name}
          </Link>
          <div className="text-xl font-semibold">${formatMoney(price)}</div>
          <p className="w-full flex-none text-medium text-gray-500 mt-1">
            {description}
          </p>
          {user && renderUserInfo()}
        </div>
        <div className="flex space-x-3 font-medium items-center justify-between mt-6">
          <button
            onClick={handleCart}
            className="w-1/2 flex items-center justify-center w-9 h-9 rounded-md bg-black text-white"
            type="button">
            {addedToCart ? <Added /> : 'Add to cart'}
          </button>
          <button
            onClick={() => removeFromWishlist(id)}
            className="flex-none flex items-center justify-center w-9 h-9 rounded-md border-gray-200 border"
            type="button"
            aria-label="like">
            <Heart color="red" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
