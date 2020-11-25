import { instagramClone } from '../../api/instagram-clone';
import { createDataContext } from './create-data-context';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_user':
      return { ...state, currentUser: action.payload };
    case 'signup':
      return { ...state, currentUser: action.payload };
    case 'signin':
      return { ...state, currentUser: action.payload };
    case 'signout':
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

const fetchUser = (dispatch) => async () => {
  const { data } = await instagramClone.get('/api/users/currentuser');

  dispatch({ type: 'fetch_user', payload: data.currentUser });
};

const signup = (dispatch) => async ({ email, password, username }) => {
  const { data } = await instagramClone.post('/api/users/signup', {
    email,
    password,
    username
  });

  dispatch({ type: 'signup', payload: data.currentUser });

  console.log(data);
};

const signin = (dispatch) => async ({ email, password }) => {
  const { data } = await instagramClone.post('/api/users/signin', {
    email,
    password
  });

  dispatch({ type: 'signin', payload: data });
};

const signout = (dispatch) => async () => {
  await instagramClone.post('/api/users/signout');

  dispatch({ type: 'signout' });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { fetchUser, signup, signin, signout },
  { currentUser: null }
);
