import React from 'react';

const SearchBar = () => {
  return (
    <div className="relative text-gray-600 focus-within:text-gray-400">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
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
      <input
        name="q"
        className="w-full focus:outline-none pl-10 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:shadow-lg border border-gray-100 text-medium"
        placeholder="Search..."
        autocomplete="off"
      />
    </div>
  );
};

export default SearchBar;
