import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/orders';
import { sum } from '../utils/sum';

const Orders = () => {
  const { state, fetchOrders } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    fetchOrders();
  }, []);

  // if (state.isLoading) return 'Loading...';
  // if (state.items.length === 0) return 'No products added to the cart';

  return <div>{JSON.stringify(state.orders)}</div>;
};

export default Orders;
