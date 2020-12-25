import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Title, Subtitle } from '@rlecomm/common';
import UserDetails from '../components/user-details';
import { Context } from '../context/users-context';

const User = ({ currentUser }) => {
  const { isLoading, user, fetchUser } = useContext(Context);
  const { username } = useParams();

  useEffect(() => {
    fetchUser(username);
  }, [username]);

  if (isLoading) return 'LOADING USER';

  return (
    <>
      <Title>User's page</Title>
      <Subtitle>
        {user?.id === currentUser.id
          ? 'This is your profile'
          : "Here's the profile of this person"}
      </Subtitle>
      <UserDetails user={user} currentUser={currentUser} />
    </>
  );
};

export default User;
