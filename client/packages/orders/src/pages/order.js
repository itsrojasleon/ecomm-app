import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
  if (orders.length === 0) return 'No products added to the cart';

  return <div>{JSON.stringify(order)}</div>;
};

export default Order;
