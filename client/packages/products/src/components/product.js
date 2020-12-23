import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Added } from '@rlecomm/common';
import { Context } from '../context/products';

const Product = ({
  id,
  name,
  price,
  description,
  imageUrl,
  wishlist,
  user
}) => {
  const [{ wishlisted, addedToCart }, setValues] = useState({
    wishlisted: Boolean(wishlist),
    // We're not going to worry about persisting added to cart value
    // I saw in amazon they don't do that, instead they increment the value of quantity
    addedToCart: false
  });

  const { addToCart, addToWishlist } = useContext(Context);

  return (
    <div className="flex">
      <div className="flex-auto p-6 shadow">
        <img
          src={`https://rlecomm-upload.s3.us-east-2.amazonaws.com/${imageUrl}`}
        />
        <div className="flex flex-wrap">
          <Link
            to={`/products/${id}`}
            className="flex-auto text-xl font-semibold">
            {name}
          </Link>
          <div className="text-xl font-semibold text-gray-500">
            ${price.toFixed(2)}
          </div>
          <p className="w-full flex-none text-sm font-medium text-gray-500 my-4">
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
        <div className="flex space-x-3 mb-4 text-sm font-medium">
          <div className="flex-auto flex space-x-3">
            <button
              onClick={() => {
                setValues({ addedToCart: true });
                addToCart(id);
              }}
              className="w-1/2 flex items-center justify-center rounded-md bg-gray-600 text-white"
              type="button">
              {addedToCart ? <Added /> : 'Add to cart'}
            </button>
          </div>
          <button
            onClick={() => {
              setValues({ wishlisted: !wishlisted });
              addToWishlist(id);
            }}
            className={`flex-none flex items-center justify-center w-9 h-9 rounded-md border-gray-400 border ${
              wishlisted ? 'text-red-500' : 'text-gray-300'
            }`}
            type="button"
            aria-label="like">
            <Heart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
