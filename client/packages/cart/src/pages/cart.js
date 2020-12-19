import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ecomm } from '../api/ecomm';
import ProductItem from '../components/cart-item';
import { Context } from '../context/cart';
import { sum } from '../utils/sum';

const Cart = () => {
  const { isLoading, items, fetchItems, removeAll } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    fetchItems();
  }, []);

  if (isLoading) return 'Loading...';
  if (items.length === 0) return 'No products added to the cart';

  const order = async () => {
    const {
      data: { id }
    } = await ecomm.post('/api/orders');

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
    <div className="flex flex-wrap shadow-lg">
      <div className="flex flex-col lg:w-8/12 w-full">
        <table className="table-auto">
          <thead>
            <tr>
              {['product details', 'quantity', 'price', 'total'].map(
                (title) => (
                  <th
                    key={title}
                    className="px-6 py-3 border border-gray-100 text-gray-500 font-medium capitalize">
                    {title}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ProductItem key={item.id} {...item} />
            ))}
          </tbody>
        </table>
        <div className="p-2">
          <button
            onClick={removeAll}
            className="m-auto text-center text-red-600 cursor-pointer block px-4 py-2 rounded-md hover:bg-red-100">
            Empty shopping cart
          </button>
        </div>
      </div>
      <div className="lg:w-4/12 w-full gap-6 lg:gap-0 bg-gray-100 p-3 flex justify-between flex-col">
        <h2 className="text-xl font-semibold">Order summary</h2>

        <div className="flex justify-between font-semibold">
          <p>Items: {sum(items).itemsCount}</p>
          <p>Kind of items: {sum(items).count}</p>
        </div>
        <div className="flex justify-between font-semibold uppercase">
          <p>Total cost</p>
          <p>${sum(items).total.toFixed(2)}</p>
        </div>
        <button
          onClick={order}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
