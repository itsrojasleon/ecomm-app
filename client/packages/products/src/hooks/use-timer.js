import { useEffect, useState } from 'react';

export const useTimer = (defaultTime = 3000) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => setIsOpen(false), defaultTime);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return isOpen;
};
