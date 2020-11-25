import React from 'react';
import NavItem from './nav-item';

const Nav = ({ currentUser }) => {
  const links = [
    { href: '/', label: 'Home' },
    !currentUser && { href: '/auth/signup', label: 'Signup' },
    !currentUser && { href: '/auth/signin', label: 'Signin' }
  ]
    .filter(Boolean)
    .map(({ href, label }) => (
      <NavItem key={label} href={href}>
        {label}
      </NavItem>
    ));

  return (
    <nav className="p-4">
      <ul className="flex space-x-2">
        {links}
        {currentUser && <button>Logout</button>}
      </ul>
    </nav>
  );
};

export default Nav;
