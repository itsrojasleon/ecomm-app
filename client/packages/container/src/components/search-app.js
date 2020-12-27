import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { mount } from 'search/SearchApp';

const SearchApp = ({ currentUser }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      currentUser
    });

    const unlisten = history.listen(onParentNavigate);

    return () => {
      unlisten();
    };
  }, []);

  return <div ref={ref} />;
};

export default SearchApp;
