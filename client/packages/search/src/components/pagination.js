import React from 'react';

const Pagination = ({ count, index, setCurrentIndex }) => {
  const handleNext = () => {
    if (index >= count - 1) {
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (index <= 0) {
      return;
    }

    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <nav
      className="relative z-0 inline-flex shadow-sm -space-x-px m-auto"
      aria-label="Pagination">
      <span
        onClick={handlePrev}
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-lg font-medium text-gray-500 hover:bg-gray-50">
        <span className="sr-only">Previous</span>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      {[...Array(count).keys()].map((number) => (
        <span
          key={number}
          onClick={() => setCurrentIndex(number)}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-lg font-medium cursor-pointer ${
            index === number ? 'bg-black text-white' : 'text-gray-700'
          }`}>
          {number + 1}
        </span>
      ))}
      <span
        onClick={handleNext}
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-lg font-medium text-gray-500 hover:bg-gray-50">
        <span className="sr-only">Next</span>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </nav>
  );
};

export default Pagination;
