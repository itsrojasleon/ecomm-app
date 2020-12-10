import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/products-context';

const Product = ({ id, name, price, description, wishlist }) => {
  const [wishlisted, setWishlisted] = useState(Boolean(wishlist));
  const { addToCart, addToWishlist } = useContext(Context);

  return (
    <div className="flex">
      {/* add image */}
      <form className="flex-auto p-6 shadow">
        <div className="flex flex-wrap">
          <Link
            to={`/products/${id}`}
            className="flex-auto text-xl font-semibold">
            {name}
          </Link>
          <div className="text-xl font-semibold text-gray-500">
            ${price.toFixed(2)}
          </div>
          <p className="w-full flex-none text-sm font-medium text-gray-500 mt-2 mb-4">
            {description}
          </p>
        </div>
        <div className="flex space-x-3 mb-4 text-sm font-medium">
          <div className="flex-auto flex space-x-3">
            <button
              onClick={() => addToCart(id)}
              className="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
              type="button">
              Add to cart
            </button>
          </div>
          <button
            onClick={() => {
              setWishlisted(!wishlisted);
              addToWishlist(id);
            }}
            className={`flex-none flex items-center justify-center w-9 h-9 rounded-md border-gray-400 border ${
              wishlisted ? 'text-red-500' : 'text-gray-300'
            }`}
            type="button"
            aria-label="like">
            <svg width="20" height="20" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;
