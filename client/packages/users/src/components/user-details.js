import React from 'react';
import { convertDate } from '../utils/date';

const UserDetails = ({
  id,
  name,
  username,
  email,
  bio,
  createdAt,
  currentUser
}) => {
  return (
    <div className="shadow w-10/12 m-auto p-4">
      <h3 className="font-semibold text-xl mb-4">{username}</h3>
      <p>{name}</p>
      <p>{email}</p>
      <p>{bio}</p>
      <p>Account created at {convertDate(createdAt)}</p>
      <p>Is this your account? {currentUser.id === id ? 'Yes' : 'Nope'}</p>
    </div>
  );
};

export default UserDetails;
