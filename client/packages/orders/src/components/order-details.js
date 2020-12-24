import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { convertDate, formatMoney } from '@rlecomm/common';
import { Context } from '../context/orders';

const OrderDetails = ({
  status,
  user,
  id: orderId,
  total,
  createdAt,
  updatedAt
}) => {
  const { cancelOrder, makePayment } = useContext(Context);

  const createdDate = () => convertDate(createdAt);
  const updatedDate = () => convertDate(updatedAt);

  return (
    <div className="flex justify-between items-center gap-4 border border-gray-100 py-2 px-1 rounded">
      <p className="uppercase">
        <strong>{status}</strong> by you (@
        {
          <Link className="hover:underline" to={`/users/${user.username}`}>
            {user.username}
          </Link>
        }
        ) on {status === 'created' ? createdDate() : updatedDate()}
      </p>
      <span>{formatMoney(total)}</span>
      <Link className="hover:underline font-semibold" to={`/orders/${orderId}`}>
        See details
      </Link>
      {status === 'created' && (
        <>
          <button
            onClick={() => cancelOrder(orderId)}
            className="py-1 px-3 rounded-md bg-red-500 text-white font-semibold">
            Cancel order
          </button>
          <StripeCheckout
            token={({ id }) => makePayment({ token: id, orderId })}
            stripeKey="pk_test_8erx4Kna0PkEURXDsmPxRRc0"
            amount={total * 100}
            email={user.email}
          />
        </>
      )}
    </div>
  );
};

export default OrderDetails;
