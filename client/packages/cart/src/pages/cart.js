import React, { useContext, useEffect, useState } from 'react';
import ProductItem from '../components/cart-item';
import { Context } from '../context/cart-context';

// pass an array
const sum = (arr) => {
  const result = arr.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.product.price * currentValue.quantity,
    0
  );

  return result;
};

const Cart = () => {
  const { state, fetchItems } = useContext(Context);

  useEffect(() => {
    fetchItems();
  }, []);

  if (state.isLoading) return 'Loading...';
  if (state.items.length === 0) return 'No products added to the cart';

  return (
    <div className="flex flex-col">
      {state.items.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
      <div>Total: $ {sum(state.items)}</div>
    </div>
  );
};

export default Cart;
