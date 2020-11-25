import React, { useEffect, useRef } from 'react';
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

const AuthApp = ({ onSignup, onSignin }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate({ pathname: nextPathname }) {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignup,
      onSignin
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};

export default AuthApp;
