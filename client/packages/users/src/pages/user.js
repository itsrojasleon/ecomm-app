import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Title, Subtitle } from '@rlecomm/common';
import UserDetails from '../components/user-details';
import UserProducts from '../components/user-products';
import { Context } from '../context/users-context';

const User = ({ currentUser }) => {
  const { isLoading, user, fetchUser } = useContext(Context);
  const { username } = useParams();

  useEffect(() => {
    fetchUser(username);
  }, [username]);

  if (!user) return <p>No user</p>;

  return (
    <>
      <Title>User's page</Title>
      <Subtitle>
        {user.id === currentUser.id
          ? 'This is your profile'
          : "Here's the profile of this person"}
      </Subtitle>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          <div className="lg:col-span-1 col-span-3">
            <UserDetails user={user} currentUser={currentUser} />
          </div>
          <div className="col-span-2">
            <UserProducts products={user.products} />
          </div>
        </div>
      )}
    </>
  );
};

export default User;
