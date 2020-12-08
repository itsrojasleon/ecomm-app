import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/cart-context';

const CartItem = ({ id, product, quantity }) => {
  const { removeItem, increase, decrease } = useContext(Context);

  return (
    <tr>
      <td className="border border-gray-100 px-4 py-2">
        <p>{product.name}</p>
        <p
          className="text-red-500 text-xs cursor-pointer my-3"
          onClick={removeItem}>
          Remove
        </p>
      </td>
      <td className="border border-gray-100 px-4 py-2">
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-xl text-gray-400 hover:text-black"
            onClick={() => decrease(id)}>
            -
          </button>
          <p>{quantity}</p>
          <button
            className="text-xl text-gray-400 hover:text-black"
            onClick={() => increase(id)}>
            +
          </button>
        </div>
      </td>
      <td className="border border-gray-100 px-4 py-2 text-center">
        $ {product.price.toFixed(2)}
      </td>
      <td className="border border-gray-100 px-4 py-2 text-right">
        $ {(product.price * quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;
