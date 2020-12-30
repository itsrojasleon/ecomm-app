import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ href, children }) => {
  return (
    <li>
      <Link
        to={href}
        className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 lg:mb-0 mb-2">
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
