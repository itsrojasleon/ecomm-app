import React from 'react';

const SideBar = () => {
  return (
    <div className="h-screen bg-red-100 p-2">
      <h4 className="font-semibold mb-4">Filter by:</h4>
      <div>
        <h5 className="font-semibold">Price</h5>
        <p>$50 - $100</p>
      </div>
    </div>
  );
};

export default SideBar;
