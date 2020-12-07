import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/cart-context';

const CartItem = ({ id, product, quantity }) => {
  const { removeItem } = useContext(Context);

  const [qty, setQty] = useState(quantity);

  return (
    <div className="flex">
      {/* add image */}
      <form className="flex-auto p-6 shadow">
        <div className="flex justify-between items-center">
          <div>
            <Link
              to={`/products/${product.id}`}
              className="text-xl font-semibold">
              {product.name}
            </Link>
            <div className="py-3">
              <input
                type="text"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
                placeholder="quantity"
              />
            </div>
            <p
              onClick={() => removeItem(id)}
              className="text-red-500 hover:underline cursor-pointer text-sm">
              Delete
            </p>
          </div>
          <div className="text-xl font-semibold">
            ${(product.price * quantity).toFixed(2)}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CartItem;
