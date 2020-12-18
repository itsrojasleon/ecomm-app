import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/orders';

const Orders = () => {
  const { state, fetchOrders } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (state.isLoading) return 'Loading...';
  if (state.orders.length === 0) return 'No products added to the cart';

  return (
    <div>
      {state.orders.map((order) => (
        <div key={order.id}>
          {order.status} - {order.total}
        </div>
      ))}
    </div>
  );
};

export default Orders;
