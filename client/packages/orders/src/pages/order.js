import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Title from '../components/title';
import { Context } from '../context/orders';
import { sum } from '../utils/sum';

const Order = () => {
  const { order, isLoading, error, fetchOrder } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchOrder(id);
  }, []);

  if (isLoading) return 'Loading...';
  if (order.length === 0) return 'No products added to the cart';

  return (
    <div>
      <Title>Order</Title>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {order.map((order) => (
          <div
            key={order.id}
            className="border border-gray-100 p-2 mt-3 flex justify-between">
            <p>{order.quantity}</p>
            <p>{order.product.name}</p>
            <p>$ {order.product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
