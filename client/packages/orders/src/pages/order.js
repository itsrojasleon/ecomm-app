import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Subtitle, Title } from '@rlecomm/common';
import OrderItem from '../components/order-item';
import { Context } from '../context/orders';

const Order = () => {
  const { order, isLoading, fetchOrder } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchOrder(id);
  }, []);

  return (
    <>
      <Title>Order #{id}</Title>
      <Subtitle>Some items related to this order</Subtitle>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid lg:grid-cols-2 md:grid-cols-2 gap-4">
          {order.map((order) => (
            <OrderItem key={order.id} {...order} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Order;
