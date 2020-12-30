import React from 'react';

const Footer = () => {
  return (
    <div className="p-4 border-t mt-4">
      <div className="flex justify-between">
        <p className="font-semibold">2020 (during coronavirus pandemic)</p>
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
