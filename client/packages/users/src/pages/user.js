import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserDetails from '../components/user-details';
import { Context } from '../context/users-context';

const User = () => {
  const { state, fetchCurrentUser, fetchUser } = useContext(Context);
  const { username } = useParams();

  useEffect(() => {
    fetchCurrentUser();
    fetchUser(username);
  }, [username]);

  if (state.isLoading) return 'LOADING USER';

  return (
    <>
      <UserDetails user={state.user} currentUser={state.currentUser} />
    </>
  );
};

export default User;
