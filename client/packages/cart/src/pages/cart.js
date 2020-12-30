import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Title, Subtitle, ecomm, sum, formatMoney } from '@rlecomm/common';
import CartItem from '../components/cart-item';
import { Context } from '../context/cart';

const Cart = () => {
  const { isLoading, items, fetchItems, removeAll } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    fetchItems();
  }, []);

  if (items.length === 0)
    return (
      <>
        <Title>Shopping Cart</Title>
        <Subtitle>No products added to the shopping cart</Subtitle>
      </>
    );

  const order = async () => {
    const {
      data: { id }
    } = await ecomm.post('/api/orders', { total: sum(items).total });

    for (let { quantity, productId } of items) {
      await ecomm.post(`/api/order-details`, {
        orderId: id,
        quantity,
        productId
      });
    }

    removeAll().then(() => {
      history.push('/orders');
    });
  };

  return (
    <>
      <Title>Shopping Cart</Title>
      <Subtitle>Here's your shopping cart</Subtitle>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <div className="col-span-4 shadow">
          <div>
            {isLoading ? (
              <p className="text-6xl">Loading</p>
            ) : (
              items.map((item) => <CartItem key={item.id} {...item} />)
            )}
          </div>
          <div className="p-2">
            <button
              onClick={removeAll}
              className="m-auto text-center text-red-600 cursor-pointer block px-4 py-2 rounded-md bg-red-100 hover:bg-red-200">
              Empty shopping cart
            </button>
          </div>
        </div>
        <div className="col-span-2 p-3 rounded shadow">
          <div className="flex flex-col justify-between h-full">
            <h2 className="text-xl font-semibold text-center">Order summary</h2>
            <div className="flex justify-between font-semibold sm:my-6">
              <div className="flex gap-1">
                <p className="text-gray-500 font-light">Items: </p>
                <p>{sum(items).itemsCount}</p>
              </div>
              <div className="flex gap-1">
                <p className="text-gray-500 font-light">Kind of items: </p>
                <p>{sum(items).count}</p>
              </div>
            </div>
            <div className="flex justify-between font-semibold sm:my-6">
              <p>Total amount:</p>
              <p className="text-blue-500">${formatMoney(sum(items).total)}</p>
            </div>
            <button
              onClick={order}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
