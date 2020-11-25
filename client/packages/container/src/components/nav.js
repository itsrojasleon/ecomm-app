import React from 'react';
import NavItem from './nav-item';

const Nav = ({ currentUser, onSignout }) => {
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
    <nav className="p-4 border-b">
      <ul className="flex justify-between items-center">
        <li className="text-lg font-semibold">Instagram clone</li>
        <div className="flex gap-3">
          {links}
          {currentUser && <button onClick={onSignout}>Logout</button>}
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
