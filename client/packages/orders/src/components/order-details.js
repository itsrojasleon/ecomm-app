import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { Context } from '../context/orders';

const OrderDetails = ({ status, user, id: orderId, total }) => {
  const { cancelOrder, makePayment } = useContext(Context);

  return (
    <div className="flex gap-4">
      <p>Status: {status}</p>
      <Link to={`/users/${user.username}`}>{user.username}</Link>
      <Link to={`/orders/${orderId}`}>Details</Link>
      <span onClick={() => cancelOrder(id)}>Cancel order</span>
      <span>{total.toFixed(2)}</span>
      <StripeCheckout
        token={({ id }) => makePayment({ token: id, orderId })}
        stripeKey="pk_test_8erx4Kna0PkEURXDsmPxRRc0"
        amount={total * 100}
        email={user.email}
      />
    </div>
  );
};

export default OrderDetails;
