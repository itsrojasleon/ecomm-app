import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ href, isActive, children }) => {
  return (
    <li>
      <Link
        to={href}
        className={`block px-4 py-2 rounded-md ${
          isActive ? 'bg-yellow-100 text-yellow-700' : ''
        }`}>
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
