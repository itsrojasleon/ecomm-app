import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { instagramClone } from '../../api/instagram-clone';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await instagramClone.post('/api/users/signup', {
      email,
      password,
      username
    });

    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
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
            <div>
              <label className="font-medium" htmlFor="username">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 sm:text-sm"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Already have an account?</p>
            <Link
              to="/auth/signin"
              className="cursor-pointer hover:text-indigo-600">
              Sign in instead.
            </Link>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
