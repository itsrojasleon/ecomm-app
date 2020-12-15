import React, { useEffect, useRef } from 'react';
import { mount } from 'products/ProductsApp';
import { useHistory } from 'react-router-dom';

const ProductsApp = ({ currentUser }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      // send navigation to the child
      onNavigate({ pathname: nextPathname }) {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      currentUser
    });

    // Listen for navigation coming from the child
    const unlisten = history.listen(onParentNavigate);

    return () => {
      unlisten();
    };
  }, []);

  return <div ref={ref} />;
};

export default ProductsApp;
