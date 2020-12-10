import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserDetails from '../components/user-details';
import { Context } from '../context/users-context';

const User = ({ currentUser }) => {
  const { state, fetchUser } = useContext(Context);
  const { username } = useParams();

  useEffect(() => {
    fetchUser(username);
  }, []);

  if (Object.values(state.user).length === 0) return 'mmmmm';

  return (
    <>
      <UserDetails user={state.user} currentUser={currentUser} />
    </>
  );
};

export default User;
