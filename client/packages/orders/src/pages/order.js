import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { convertDate } from '@rlecomm/common';
import Title from '../components/title';
import Add from '../components/add';
import { Context } from '../context/orders';

const Order = () => {
  const { order, isLoading, error, fetchOrder } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchOrder(id);
  }, []);

  if (isLoading) return 'Loading...';
  if (order.length === 0) return 'No products added to the cart';

  return (
    <>
      <Title>Order # {id}</Title>
      <ul className="border border-gray-200 rounded">
        {order.map((order) => (
          <article
            key={order.id}
            className="p-4 flex items-center justify-between">
            <div className="flex gap-3">
              <img
                src={
                  'https://rlecomm-upload.s3.us-east-2.amazonaws.com/' +
                  order.product.imageUrl
                }
                alt={order.product.name}
                className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
                width="144"
                height="144"
              />
              <div className="flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-black mb-0.5">
                  {order.product.name}
                </h2>
                <div className="flex flex-row gap-1">
                  <p className="text-gray-600">
                    {order.quantity} X $ {order.product.price.toFixed(2)} =
                  </p>
                  <p className="font-semibold">
                    $ {(order.quantity * order.product.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <span className="border rounded-full">
              <Add />
            </span>
          </article>
        ))}
      </ul>
    </>
  );
};

export default Order;
