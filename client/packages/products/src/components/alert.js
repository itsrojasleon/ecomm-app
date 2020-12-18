import React from 'react';

const Alert = ({ children, color }) => (
  <div className={`text-white px-6 py-4 border-0 rounded bg-${color}-600`}>
    <span className="text-xl inline-block mr-5 align-middle">
      <svg
        className=""
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    </span>
    <span className="inline-block align-middle mr-8">{children}</span>
  </div>
);

export default Alert;
