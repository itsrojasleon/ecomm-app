import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ecomm } from '../../api/ecomm';
import UserDetails from '../components/user-details';

const User = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await ecomm.get(`/api/users/${username}`);

        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  if (Object.values(user).length === 0) return 'mmmmm';

  return (
    <div>
      <UserDetails user={user} currentUser={currentUser} />
    </div>
  );
};

export default User;
