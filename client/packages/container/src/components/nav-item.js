import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ href, children }) => {
  return (
    <li>
      <Link to={href} className="block px-4 py-2 rounded-md hover:bg-gray-100">
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
