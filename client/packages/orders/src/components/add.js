import React from 'react';

const Add = ({ size = 7 }) => (
  <svg
    className={`h-${size} w-${size} text-black cursor-pointer`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

export default Add;
