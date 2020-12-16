import React, { useEffect, useState } from 'react';

const Rating = ({ numberOfStars = 5, defaultStars = 1, setStars }) => {
  const [index, setIndex] = useState(defaultStars);

  useEffect(() => {
    setIndex(defaultStars);
  }, [defaultStars]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center mt-2 mb-4">
        {[...Array(numberOfStars).keys()].map((n) => (
          <svg
            onClick={() => {
              // Make it readonly if we don't provide setStars function
              if (setStars) {
                setIndex(n + 1);
                setStars(n + 1);
              }
            }}
            key={n}
            className={`w-7 h-7 fill-current cursor-pointer ${
              index <= n ? 'text-gray-400' : 'text-yellow-400'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default Rating;
