import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Heart, User, Cart } from '@rlecomm/common';
import NavItem from './nav-item';
import { Context } from '../context/container-context';

const Nav = () => {
  const { currentUser, signout } = useContext(Context);
  const history = useHistory();

  const links = [
    { href: '/', label: 'Home' },
    !currentUser && { href: '/auth/signup', label: 'Signup' },
    !currentUser && { href: '/auth/signin', label: 'Signin' },
    currentUser && { href: '/products', label: 'Products' },
    currentUser && { href: '/products/create', label: 'Sell' },
    currentUser && { href: '/orders', label: 'Orders' }
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
