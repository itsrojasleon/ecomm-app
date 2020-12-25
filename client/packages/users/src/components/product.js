import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Added, formatMoney, S3_BUCKET_NAME } from '@rlecomm/common';

const Product = ({ id, name, price, description, imageUrl }) => {
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
        </div>
      </div>
    </div>
  );
};

export default Product;
