import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { convertDate } from '@rlecomm/common';
import Title from '../components/title';
import Table from '../components/table';
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
    <div>
      <Title>Order # {id}</Title>
      <Table headers={['id', 'quantity', 'name', 'price', 'created at']}>
        {order.map((order) => (
          <tr key={order.id}>
            <td className="border border-gray-200 px-4 py-2">{order.id}</td>
            <td className="border border-gray-200 px-4 py-2">
              {order.quantity}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {order.product.name}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {order.product.price.toFixed(2)}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {convertDate(order.createdAt)}
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default Order;
