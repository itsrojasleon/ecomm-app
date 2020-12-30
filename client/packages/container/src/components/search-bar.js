import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBar = ({ onSubmit }) => {
  const [term, setTerm] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/search/${term}`);
  };

  return (
    <div className="relative text-gray-600 focus-within:text-gray-400">
      <span className="sm:hidden lg:block top-2 absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          type="submit"
          className="p-1 focus:outline-none focus:shadow-outline">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gray-500">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
      <form onSubmit={handleSubmit}>
        <input
          value={term}
          onChange={handleChange}
          className="w-full focus:outline-none lg:pl-10 pl-3 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:shadow border border-gray-100 text-medium transition"
          placeholder="Search for products..."
          autoComplete="off"
        />
        <div className="flex justify-end">
          <button className="mt-3 lg:hidden py-2 px-4 border border-transparen font-medium rounded-md text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
