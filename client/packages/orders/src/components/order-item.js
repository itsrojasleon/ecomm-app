import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate, formatMoney, S3_BUCKET_NAME } from '@rlecomm/common';

const OrderDetails = ({ id, product, quantity, createdAt }) => {
  return (
    <article className="p-4 bg-gray-100 rounded">
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <img
            src={`${S3_BUCKET_NAME}/${product.imageUrl}`}
            alt={product.name}
            className="flex-none rounded-lg object-cover bg-gray-100"
            width="120"
            height="120"
          />
          <div className="flex flex-col justify-between">
            <Link
              to={`/products/${product.id}`}
              className="text-lg font-semibold text-blue-500 hover:underline">
              {product.name}
            </Link>
            <div className="flex flex-row gap-1">
              <p className="text-gray-400">Quantity:</p>
              <p className="font-semibold">{quantity}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-gray-400">Total</p>
          <p className="font-semibold">
            ${formatMoney(product.price * quantity)}
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-gray-400">Created at</p>
          <p className="font-semibold">{convertDate(createdAt)}</p>
        </div>
      </div>
    </article>
  );
};

export default OrderDetails;
