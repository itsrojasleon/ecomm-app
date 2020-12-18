import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NavItem from './nav-item';
import { Context } from '../context/container-context';

const User = () => (
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

const Heart = () => (
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
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const Cart = () => (
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
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const Nav = () => {
  const { currentUser, signout } = useContext(Context);
  const history = useHistory();

  const links = [
    { href: '/', label: 'Home' },
    !currentUser && { href: '/auth/signup', label: 'Signup' },
    !currentUser && { href: '/auth/signin', label: 'Signin' },
    currentUser && { href: '/products', label: 'Products' },
    currentUser && { href: '/products/create', label: 'Sell' }
  ]
    .filter(Boolean)
    .map(({ href, label }) => (
      <NavItem key={href} href={href}>
        {label}
      </NavItem>
    ));

  return (
    <nav className="p-4 border-b mb-4">
      <ul className="flex justify-between items-center">
        <li className="text-lg font-semibold">Ecomm App</li>
        <div className="flex gap-3">
          {links}
          {currentUser && (
            <>
              <Link to="/wishlist" className="block px-4 py-2 rounded-md">
                <Heart />
              </Link>
              <Link to="/cart" className="block px-4 py-2 rounded-md">
                <Cart />
              </Link>
              <Link
                to={`/users/${currentUser.username}`}
                className="block px-4 py-2 rounded-md">
                <User />
              </Link>
              <button
                className="block px-4 py-2 rounded-md bg-red-100 text-red-700"
                onClick={() => signout().then(() => history.push('/'))}>
                Sign out
              </button>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
