import React from 'react';
import { Link } from 'react-router-dom';
import NavItem from './nav-item';

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-400 hover:text-gray-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Nav = ({ currentUser, onSignout }) => {
  const links = [
    { href: '/', label: 'Home' },
    !currentUser && { href: '/auth/signup', label: 'Signup' },
    !currentUser && { href: '/auth/signin', label: 'Signin' },
    currentUser && { href: '/products', label: 'Products' },
    currentUser && { href: '/products/new', label: 'Sell' }
  ]
    .filter(Boolean)
    .map(({ href, label }) => (
      <NavItem key={href} href={href}>
        {label}
      </NavItem>
    ));

  return (
    <nav className="p-4 border-b">
      <ul className="flex justify-between items-center">
        <li className="text-lg font-semibold">Instagram clone</li>
        <div className="flex gap-3">
          {links}
          {currentUser && (
            <button
              className="block px-4 py-2 rounded-md bg-red-100 text-red-700"
              onClick={onSignout}>
              Logout
            </button>
          )}
          {currentUser && (
            <Link to="/profile" className="block px-4 py-2 rounded-md">
              <Icon />
            </Link>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
