import React, { useEffect, useState } from 'react';
import { Star } from '@rlecomm/common';

const Rating = ({ numberOfStars = 5, defaultStars = 1, setStars }) => {
  const [index, setIndex] = useState(defaultStars);

  useEffect(() => {
    setIndex(defaultStars);
  }, [defaultStars]);

  const handleClick = (n) => {
    if (setStars) {
      setIndex(n + 1);
      setStars(n + 1);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center mt-2 mb-4">
        {[...Array(numberOfStars).keys()].map((n) => (
          <Star key={n} onClick={() => handleClick(n)} index={index} n={n} />
        ))}
      </div>
    </div>
  );
};

export default Rating;
