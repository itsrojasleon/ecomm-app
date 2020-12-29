import React, { useContext } from 'react';
import { S3_BUCKET_NAME, formatMoney } from '@rlecomm/common';
import { Context } from '../context/cart';

const CartItem = ({ id, product, quantity }) => {
  const { removeItem, increase, decrease } = useContext(Context);

  return (
    <div className="flex justify-between items-center p-3">
      <div className="flex gap-2">
        <img
          className="h-28 rounded transform hover:scale-105 transition"
          src={`${S3_BUCKET_NAME}/${product.imageUrl}`}
          alt={product.name}
        />
        <div className="flex flex-col justify-between">
          <p className="font-bold text-lg">{product.name}</p>
          <p className="text-gray-900 font-semibold">
            ${formatMoney(product.price)}
          </p>
          <p className="text-gray-500">
            Quantity: <strong>{quantity}</strong>
          </p>
          <p
            className="text-red-500 text-xs cursor-pointer"
            onClick={() => removeItem(id)}>
            Remove
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => decrease(id)}
          className="rounded-full h-8 w-8 flex items-center justify-center text-2xl border cursor-buttonointer transform hover:scale-125 transition">
          -
        </button>

        <button
          onClick={() => increase(id)}
          className="rounded-full h-8 w-8 flex items-center justify-center text-2xl border cursor-pointer transform hover:scale-125 transition">
          +
        </button>
      </div>
      <p className="text-lg font-semibold">
        ${formatMoney(product.price * quantity)}
      </p>
    </div>
  );
};

export default CartItem;
