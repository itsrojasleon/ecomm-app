import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Added,
  Star,
  formatMoney,
  S3_BUCKET_NAME
} from '@rlecomm/common';
import { Context } from '../context/search';

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

  const renderReviewsInfo = () => (
    <span className="flex items-center">
      <Star />
      <span className="text-gray-400 text-xs">({reviews.length})</span>
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
            onClick={handleWishlist}
            className="flex-none flex items-center justify-center w-9 h-9 rounded-md border-gray-200 border"
            type="button"
            aria-label="like">
            <Heart color={wishlisted ? 'red' : 'gray'} />
          </button>
          {reviews.length > 0 && renderReviewsInfo()}
        </div>
      </div>
    </div>
  );
};

export default Product;
