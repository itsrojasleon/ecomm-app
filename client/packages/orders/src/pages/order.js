import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../components/title';
import OrderItem from '../components/order-item';
import { Context } from '../context/orders';

const Order = () => {
  const { order, isLoading, error, fetchOrder } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchOrder(id);
  }, []);

  if (isLoading) return 'Loading...';
  if (order.length === 0) return 'This order does not exist';

  return (
    <>
      <Title>Order # {id}</Title>
      <ul className="grid lg:grid-cols-2 md:grid-cols-2 gap-4">
        {order.map((order) => (
          <OrderItem key={order.id} {...order} />
        ))}
      </ul>
    </>
  );
};

export default Order;
