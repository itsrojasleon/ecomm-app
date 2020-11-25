import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ href, children }) => {
  return (
    <li>
      <NavLink
        to={href}
        activeClassName="bg-yellow-100 text-yellow-700"
        className="block px-4 py-2 rounded-md">
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
