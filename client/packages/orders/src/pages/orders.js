import React, { useContext, useEffect } from 'react';
import { Context } from '../context/orders';
import Title from '../components/title';
import OrderDetails from '../components/order-details';

const Orders = () => {
  const { isLoading, orders, fetchCreatedOrders } = useContext(Context);

  useEffect(() => {
    fetchCreatedOrders();
  }, []);

  if (isLoading) return 'Loading...';
  if (orders.length === 0) return 'There is nothing here';

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
