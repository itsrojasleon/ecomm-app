import React from 'react';

const Review = ({ title, comment }) => {
  return (
    <div className="border border-gray-100 rounded-lg p-3">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-700">{comment}</p>
    </div>
  );
};

export default Review;
