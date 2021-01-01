import React, { useContext, useState } from 'react';
import { Context } from '../context/search';

const SideBar = () => {
  const { products, filterByPrices, resetSearch } = useContext(Context);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [errors, setErrors] = useState([]);

  const prices = products.map((product) => product.price);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (min < minPrice) {
      setErrors(() => [`Min value has to greater or equal than ${minPrice}`]);
      return;
    }

    if (max > maxPrice || max < min) {
      setErrors(() => {
        return [
          `Max value has to less or equal than ${maxPrice} and has to be greater or equal than ${min}`
        ];
      });
      return;
    }

    setErrors([]);
    filterByPrices({ min, max });
  };

  return (
    <>
      <h4 className="font-semibold mb-4">Filter by:</h4>
      <div>
        <h5 className="font-semibold">Prices</h5>
        <div>
          <form className="flex gap-1 flex-col" onSubmit={handleSubmit}>
            <input
              type="number"
              required
              value={min}
              className="w-full focus:outline-none py-1 pl-2 rounded text-black border border-gray-200 transition"
              onChange={(e) => setMin(e.target.value)}
              placeholder="min price"
            />
            <input
              type="number"
              required
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full focus:outline-none py-1 pl-2 rounded text-black border border-gray-200 transition"
              placeholder="max price"
            />
            <button
              type="submit"
              className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Filter
            </button>
          </form>
          {errors.map((error) => (
            <p key={error} className="text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>
      <button
        disabled={!min || !max}
        className="my-10 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={resetSearch}>
        Reset Filters
      </button>
    </>
  );
};

export default SideBar;
