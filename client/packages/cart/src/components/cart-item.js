import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/cart-context';

const CartItem = ({ id, product, quantity }) => {
  const { removeItem, increase } = useContext(Context);
  const [qty, setQty] = useState(parseInt(quantity));

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
            <div>quantity: {quantity}</div>
            <div className="flex flex-col">
              <div onClick={() => increase(id)}>+</div>
              <button>-</button>
            </div>
            <p
              onClick={() => removeItem(id)}
              className="text-red-500 hover:underline cursor-pointer text-sm">
              Delete
            </p>
          </div>
          <div className="text-xl font-semibold">${product.price * qty}</div>
        </div>
      </form>
    </div>
  );
};

export default CartItem;
