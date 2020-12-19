import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../context/orders';
import { sum } from '../utils/sum';

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
      {orders.map((order) => (
        <Link key={order.id} to={`/orders/${order.id}`}>
          {order.id}
        </Link>
      ))}
    </div>
  );
};

export default Orders;
