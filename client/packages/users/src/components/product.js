import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ecomm } from '../../api/ecomm';

const Product = ({ id, name, price, description }) => {
  const [wishlisted, setWishlisted] = useState(false);

  const handleWishlist = async () => {
    try {
      setWishlisted(true);
      await ecomm.post('/api/wishlist', { productId: id });
    } catch (err) {
      console.error(err);
    }
  };

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
              className="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
              type="submit">
              Buy now
            </button>
            <button
              className="w-1/2 flex items-center justify-center rounded-md border border-gray-300"
              type="button">
              Add to bag
            </button>
          </div>
          <button
            disabled={wishlisted}
            onClick={handleWishlist}
            className={`flex-none flex items-center justify-center w-9 h-9 rounded-md border-gray-300 border ${
              wishlisted ? 'text-black' : 'text-gray-300'
            }`}
            type="button"
            aria-label="like">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;
