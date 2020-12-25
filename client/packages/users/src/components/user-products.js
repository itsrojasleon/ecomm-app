import React, { useContext } from 'react';
import { Subtitle } from '@rlecomm/common';
import { Context } from '../context/users-context';
import Product from './product';

const UserDetails = ({ products }) => {
  return (
    <div>
      <Subtitle>
        {!products.length
          ? 'This user does not have any products'
          : "User's products"}
      </Subtitle>
      <div className="grid grid-cols-2 gap-4 shadow-md p-3">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
