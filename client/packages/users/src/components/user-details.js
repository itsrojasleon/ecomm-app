import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { convertDate } from '@rlecomm/common';
import { Context } from '../context/users-context';

const UserDetails = ({ user, currentUser }) => {
  const [isUpdating, setUpdating] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');

  const { updateUser, signout } = useContext(Context);

  const history = useHistory();

  const isOwner = currentUser.id === user.id;

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({ username: user.username, bio, name });

    setUpdating(false);
  };

  const handleSignout = () => {
    signout().then(() => history.push('/'));
  };

  const renderContent = () => (
    <>
      <div className="flex flex-col mb-2">
        {user.name ? (
          <p className="font-semibold text-lg">{user.name}</p>
        ) : (
          <p className="font-semibold text-lg">{user.username}</p>
        )}
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-900 font-light my-3">{user.bio}</p>
        <p className="text-gray-900 mb-3">
          Account created on <strong>{convertDate(user.createdAt)}</strong>
        </p>
      </div>
      {isOwner && (
        <>
          <button
            onClick={() => setUpdating(true)}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mb-3"
            type="submit">
            Update Profile
          </button>
          <button
            onClick={handleSignout}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
            Signout
          </button>
        </>
      )}
    </>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="pb-3">
        <label className="font-medium pb-2" htmlFor="name">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 sm:text-sm"
          placeholder="enter your name"
        />
      </div>
      <div className="pb-3">
        <label className="font-medium pb-2" htmlFor="name">
          Biography
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 sm:text-sm"
          placeholder="enter your biography"
          rows={4}
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          onClick={() => setUpdating(false)}
          className="w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
        <button
          type="submit"
          className="w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Update
        </button>
      </div>
    </form>
  );

  return (
    <div className="flex flex-col justify-between shadow-md p-3">
      {isUpdating ? renderForm() : renderContent()}
    </div>
  );
};

export default UserDetails;
