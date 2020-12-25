import React, { useEffect, useContext } from 'react';
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

  if (!user) return 'No user';
  if (isLoading) return 'Loading User...';

  return (
    <>
      <Title>User's page</Title>
      <Subtitle>
        {user?.id === currentUser.id
          ? 'This is your profile'
          : "Here's the profile of this person"}
      </Subtitle>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4">
        <UserDetails user={user} currentUser={currentUser} />
        <UserProducts products={user.products} />
      </div>
    </>
  );
};

export default User;
