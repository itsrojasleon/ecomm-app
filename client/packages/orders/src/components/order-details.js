import React from 'react';
import { Link } from 'react-router-dom';

const OrderDetails = ({ status, user, id }) => {
  return (
    <div className="flex gap-4">
      <p>Status: {status}</p>
      <Link to={`/users/${user.username}`}>{user.username}</Link>
      <Link to={`/orders/${id}`}>Details</Link>
      <Link className="border rounded px-2" to="/payments">
        Pay
      </Link>
    </div>
  );
};

export default OrderDetails;
