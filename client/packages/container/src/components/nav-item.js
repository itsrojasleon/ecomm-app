import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ href, children }) => {
  return (
    <li>
      <NavLink
        to={href}
        className="block px-4 py-2 rounded-md hover:bg-yellow-100 hover:text-yellow-700">
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
