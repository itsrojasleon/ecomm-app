import React from 'react';
import { useTimer } from '../hooks/use-timer';

const Alert = () => {
  const isOpen = useTimer();

  if (!isOpen) return null;

  return (
    <div className="text-white px-6 py-4 border-0 rounded absolute bottom-0 right-0 mb-4 mr-4 bg-purple-500">
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-bell" />
      </span>
      <span className="inline-block align-middle mr-8">
        <b className="capitalize">pink!</b> This is a pink alert - check it out!
      </span>
      <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
        <span>×</span>
      </button>
    </div>
  );
};

export default Alert;
