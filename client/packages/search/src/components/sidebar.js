import React, { useContext } from 'react';
import { Context } from '../context/search';
import { getRanges } from '../utils/ranges';

const SideBar = () => {
  const { products } = useContext(Context);
  const prices = products.map((product) => product.price);

  return (
    <div className="h-screen bg-red-100 p-2">
      <h4 className="font-semibold mb-4">Filter by:</h4>
      <div>
        <h5 className="font-semibold">Price</h5>
        {getRanges(prices).map((price) => {
          return <p key={price}>{price}</p>;
        })}
        {/* {prices.reduce((a, b) => a + b, 0)} */}
        {/* {maxPrice} - {minPrice} */}
      </div>
    </div>
  );
};

export default SideBar;
