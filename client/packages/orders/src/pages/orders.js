import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../context/orders';
import Title from '../components/title';
import { sum } from '../utils/sum';
import OrderDetails from '../components/order-details';

const Orders = () => {
  const { isLoading, orders, fetchOrders } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) return 'Loading...';
  if (orders.length === 0) return 'No products added to the cart';

  return (
    <div>
      <Title>Orders</Title>
      <div className="gap-4">
        {orders.map((order) => (
          <OrderDetails key={order.id} {...order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
