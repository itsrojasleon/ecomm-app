import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Title, Subtitle, ecomm } from '@rlecomm/common';
import { Context } from '../context/products';

const Create = () => {
  const { createProduct } = useContext(Context);

  const history = useHistory();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await ecomm.get('/api/upload');

    await axios.put(data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });

    createProduct({ name, price, description, imageUrl: data.key }).then(() => {
      history.push('/');
    });
  };

  return (
    <>
      <Title>Create a product</Title>
      <Subtitle>Provide the following values</Subtitle>
      <div className="flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
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
              <div className="pb-3">
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
              <div className="pb-3">
                <label className="font-medium" htmlFor="image">
                  Product's image
                </label>
                <input
                  name="image"
                  accept="image/*"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                  className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
                  placeholder="image url"
                />
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
