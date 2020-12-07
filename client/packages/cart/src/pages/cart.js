import React, { useContext, useEffect, useState } from 'react';
import ProductItem from '../components/cart-item';
import { Context } from '../context/cart-context';

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
      <div>Total: $ {}</div>
    </div>
  );
};

export default Cart;
