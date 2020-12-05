import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { convertDate } from '../utils/date';
import { ecomm } from '../../api/ecomm';

const UserDetails = ({ user, currentUser }) => {
  const history = useHistory();
  const [isUpdating, setUpdating] = useState(false);

  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');

  const isOwner = currentUser.id === user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ecomm.put(`/api/users/${user.username}`, { name, bio });
      history.push('/');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const renderContent = () => (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h3 className="font-semibold text-xl mb-4">{user.username}</h3>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.bio}</p>
        <p>Account created at {convertDate(user.createdAt)}</p>
      </div>
      {isOwner && (
        <button
          onClick={() => setUpdating(true)}
          className="w-1/3 py-2 flex items-center justify-center rounded-md bg-black text-white"
          type="submit">
          Update Profile
        </button>
      )}
    </div>
  );

  const renderForm = () => (
    <form className="flex flex-col" onSubmit={handleSubmit}>
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
        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-indigo-500 sm:text-sm"
          placeholder="enter your biography"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Update
        </button>
        <button
          type="submit"
          onClick={() => setUpdating(false)}
          className="w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="shadow w-10/12 m-auto p-4">
      {isUpdating ? renderForm() : renderContent()}
    </div>
  );
};

export default UserDetails;
