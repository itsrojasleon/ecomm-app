import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const New = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      'http://localhost:4000/api/products',
      { name, price, description },
      { withCredentials: true }
    );

    history.push('/products');
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a product
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="pb-3">
              <label className="font-medium pb-2" htmlFor="name">
                Product's name
              </label>
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
                placeholder="name"
              />
            </div>
            <div className="pb-3">
              <label className="font-medium" htmlFor="price">
                Product's price
              </label>
              <input
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
                placeholder="price"
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="description">
                Product's description
              </label>
              <input
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
                placeholder="description"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default New;
