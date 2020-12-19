import React, { useEffect, useRef } from 'react';
import { mount } from 'orders/OrdersApp';
import { useHistory } from 'react-router-dom';

const CartApp = () => {
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
      }
    });

    const unlisten = history.listen(onParentNavigate);

    return () => {
      unlisten();
    };
  }, []);

  return <div ref={ref} />;
};

export default CartApp;
