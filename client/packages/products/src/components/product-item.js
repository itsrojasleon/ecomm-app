import React from 'react';

const ProductList = ({ name, price, description, createdAt }) => {
  return (
    <div className="flex p-6 shadow-lg">
      {/* <div className="flex-none w-44 relative">
        <img
          src="/kids-jumpsuit.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div> */}
      <form className="flex-auto pl-6">
        <div className="flex flex-wrap items-baseline">
          <h1 className="w-full flex-none font-semibold mb-2.5">{name}</h1>
          <div className="text-4xl leading-7 font-bold text-gray-600">
            ${parseFloat(price).toFixed(2)}
          </div>
          <div className="text-sm font-medium text-gray-400 ml-3">In stock</div>
        </div>
        <div className="flex items-baseline my-8">
          <p>{description}</p>
        </div>
        <div className="flex space-x-3 mb-4 text-sm font-semibold">
          <div className="flex-auto flex space-x-3">
            <button
              className="w-1/2 flex items-center justify-center rounded-full bg-gray-700 text-white"
              type="submit">
              Buy now
            </button>
            <button
              className="w-1/2 flex items-center justify-center rounded-full bg-gray-50 text-gray-700"
              type="button">
              Add to cart
            </button>
          </div>
          <button
            className="flex-none flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 text-gray-700"
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

export default ProductList;
