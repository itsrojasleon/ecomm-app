import React from 'react';

const Footer = () => {
  return (
    <div className="p-4 border-t mt-4">
      <div className="flex justify-between">
        <p className="font-semibold">31/12/2020</p>
        <p>
          Made with love by{' '}
          <a href="https://github.com/rojasleon" target="_blank">
            <strong>@rojasleon</strong>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
