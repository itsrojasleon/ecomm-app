import React, { useContext, useEffect } from 'react';
import { Context } from '../context/orders';
import Title from '../components/title';
import OrderDetails from '../components/order-details';
import { Tabs, TabMenu, TabItem } from '../components/tabs';

const Orders = () => {
  const { isLoading, orders, fetchOrders } = useContext(Context);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) return 'Loading...';
  if (orders.length === 0) return 'There is nothing here';

  return (
    <div>
      <div className="gap-4">
        <Tabs>
          <TabMenu titles={['Created', 'Completed', 'Cancelled']} />
          <TabItem index={0}>
            {orders
              .filter((order) => order.status === 'created')
              .map((order) => (
                <OrderDetails key={order.id} {...order} />
              ))}
          </TabItem>
          <TabItem index={1}>
            {orders
              .filter((order) => order.status === 'completed')
              .map((order) => (
                <OrderDetails key={order.id} {...order} />
              ))}
          </TabItem>
          <TabItem index={2}>
            {orders
              .filter((order) => order.status === 'cancelled')
              .map((order) => (
                <OrderDetails key={order.id} {...order} />
              ))}
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
