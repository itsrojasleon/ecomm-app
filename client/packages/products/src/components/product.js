import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Added, Star } from '@rlecomm/common';
import { Context } from '../context/products';

const Product = ({
  id,
  name,
  price,
  description,
  imageUrl,
  wishlist,
  reviews,
  user
}) => {
  const [{ wishlisted, addedToCart }, setValues] = useState({
    wishlisted: Boolean(wishlist),
    // We're not going to worry about persisting added to cart value
    // I saw in amazon they don't do that, instead they increment the value of quantity
    addedToCart: false
  });
  const { addToCart, addToWishlist } = useContext(Context);

  const handleWishlist = () => {
    addToWishlist(id).then(() => setValues({ wishlisted: !wishlisted }));
  };

  const handleCart = () => {
    addToCart(id).then(() => setValues({ addedToCart: true }));
  };

  return (
    <div className="flex">
      <div className="flex-auto p-6">
        <img
          className="rounded-xl"
          src={`https://rlecomm-upload.s3.us-east-2.amazonaws.com/${imageUrl}`}
        />
        <div className="flex flex-wrap mt-3">
          <Link
            to={`/products/${id}`}
            className="flex-auto text-xl font-semibold">
            {name}
          </Link>
          <div className="text-xl font-semibold">${price.toFixed(2)}</div>
          <p className="w-full flex-none text-medium text-gray-500 mt-1">
            {description}
          </p>
          {user && (
            <p className="mb-4">
              By{' '}
              <Link className="hover:underline" to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </p>
          )}
        </div>
        {/* ehre */}
        <div className="flex space-x-3 font-medium items-center justify-between mt-6">
          <button
            onClick={handleCart}
            className="w-1/2 flex items-center justify-center w-9 h-9 rounded-md bg-black text-white"
            type="button">
            {addedToCart ? <Added /> : 'Add to cart'}
          </button>
          <button
            onClick={handleWishlist}
            className={`flex-none flex items-center justify-center w-9 h-9 rounded-md border-gray-400 border ${
              wishlisted ? 'text-red-500' : 'text-gray-300'
            }`}
            type="button"
            aria-label="like">
            <Heart />
          </button>
          <span className="flex items-center">
            <Star />
            <span className="text-gray-400">({reviews.length})</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
