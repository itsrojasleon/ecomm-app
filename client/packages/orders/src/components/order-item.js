import React, { useState } from 'react';
import {
  convertDate,
  formatMoney,
  Add,
  Close,
  S3_BUCKET_NAME
} from '@rlecomm/common';

const OrderDetails = ({ id, product, quantity, createdAt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      key={id}
      className="p-4 flex items-center justify-between border border-gray-200 rounded ">
      <div className="flex gap-3">
        <img
          src={`${S3_BUCKET_NAME}/${product.imageUrl}`}
          alt={product.name}
          className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
          width="144"
          height="144"
        />
        <div className="flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-black mb-0.5">
            {product.name}
          </h2>
          <div className="flex flex-row gap-1">
            <p className="text-gray-600">
              {quantity} X {formatMoney(product.price)} =
            </p>
            <p className="font-semibold">
              ${formatMoney(quantity * product.price)}
            </p>
          </div>
        </div>
      </div>
      <span
        onClick={() => setIsOpen((prev) => !prev)}
        className="border rounded-full p-1 shadow">
        {isOpen ? <Close /> : <Add />}
      </span>
      {isOpen && (
        <p>
          Created on <strong>{convertDate(createdAt)}</strong>
        </p>
      )}
    </article>
  );
};

export default OrderDetails;
