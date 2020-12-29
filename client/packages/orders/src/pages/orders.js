import React, { useContext, useEffect } from 'react';
import { Context } from '../context/orders';
import { Title, Subtitle } from '@rlecomm/common';
import OrderDetails from '../components/order-details';
import { Tabs, TabMenu, TabItem } from '../components/tabs';

const TITLES = ['created', 'completed', 'cancelled'];

const Orders = () => {
  const { isLoading, orders, fetchOrders } = useContext(Context);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Title>Orders</Title>
      <Subtitle>These are your orders</Subtitle>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="gap-4">
          <Tabs>
            <TabMenu titles={TITLES} />
            {TITLES.map((title, i) => {
              let newOrders = orders.filter((order) => order.status === title);

              return (
                <TabItem key={title} index={i}>
                  {!newOrders.length
                    ? 'No orders'
                    : newOrders.map((order) => (
                        <OrderDetails key={order.id} {...order} />
                      ))}
                </TabItem>
              );
            })}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Orders;
