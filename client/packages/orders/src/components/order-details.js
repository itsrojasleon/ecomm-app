import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/orders';

const OrderDetails = ({ status, user, id }) => {
  const { cancelOrder } = useContext(Context);

  return (
    <div className="flex gap-4">
      <p>Status: {status}</p>
      <Link to={`/users/${user.username}`}>{user.username}</Link>
      <Link to={`/orders/${id}`}>Details</Link>
      <Link className="border rounded px-2" to="/payments">
        Pay
      </Link>
      <span onClick={() => cancelOrder(id)}>Cancel order</span>
    </div>
  );
};

export default OrderDetails;
