import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Title, Subtitle, ecomm } from '@rlecomm/common';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ecomm
        .post('/api/users/signin', { email, password })
        .then(() => history.push('/'));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Title>Signin</Title>
      <Subtitle>Signin into your account</Subtitle>
      <div className="flex items-center justify-center">
        <div className="lg:max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="pb-3">
                <label className="font-medium pb-2" htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="pb-3">
                <label className="font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Don't have an account?</p>
              <Link
                to="/auth/signup"
                className="cursor-pointer hover:text-indigo-600">
                Sign up instead.
              </Link>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
