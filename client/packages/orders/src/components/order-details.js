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
  orders,
  createdAt,
  updatedAt
}) => {
  const { cancelOrder, makePayment } = useContext(Context);

  return (
    <div className="p-4 bg-gray-100 rounded">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400">Status</p>
          <div className="flex gap-1">
            <p className="font-semibold uppercase">{status}</p>
            <p>
              at{' '}
              {status === 'created'
                ? convertDate(createdAt)
                : convertDate(updatedAt)}
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-400">Products</p>
          <p className="font-semibold uppercase">{orders.length}</p>
        </div>
        <div>
          <p className="text-gray-400">Total</p>
          <p className="font-semibold uppercase">${formatMoney(total)}</p>
        </div>
        <Link
          to={`/orders/${orderId}`}
          className="font-semibold hover:underline cursor-pointer">
          See details
        </Link>
        {status === 'created' && (
          <>
            <StripeCheckout
              token={({ id }) => makePayment({ token: id, orderId })}
              stripeKey="pk_test_8erx4Kna0PkEURXDsmPxRRc0"
              amount={total * 100}
              email={user.email}
            />
            <button
              onClick={() => cancelOrder(orderId)}
              className="py-1 px-3 rounded-md bg-red-500 text-white font-semibold">
              Cancel order
            </button>
          </>
        )}
      </div>
      {/* <p className="uppercase">
        <strong>{status}</strong> by you (@
        {
          <Link className="hover:underline" to={`/users/${user.username}`}>
            {user.username}
          </Link>
        }
        ) on {status === 'created' ? createdDate() : updatedDate()}
      </p> */}
      {/* <span>{formatMoney(total)}</span> */}
      {/*  */}
      {/* {status === 'created' && (
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
      )} */}
    </div>
  );
};

export default OrderDetails;
