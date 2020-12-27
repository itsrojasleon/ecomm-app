import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, Cart } from '@rlecomm/common';
import NavItem from './nav-item';
import SearchBar from './search-bar';
import { Context } from '../context/container-context';

const Nav = () => {
  const { currentUser, searchProducts } = useContext(Context);

  const links = [
    { href: '/', label: 'Home' },
    !currentUser && { href: '/auth/signup', label: 'Signup' },
    !currentUser && { href: '/auth/signin', label: 'Signin' },
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
        <Link to="/">
          <li className="text-lg font-bold">Ecomm</li>
        </Link>
        <div className="flex gap-3">
          <div>
            <SearchBar />
          </div>
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
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
