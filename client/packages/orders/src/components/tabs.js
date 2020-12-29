import React, { createContext, useContext, useState } from 'react';

const Context = createContext(null);
Context.displayName = 'TabsContext';

const Tabs = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Context.Provider value={{ currentIndex, setCurrentIndex }}>
      {children}
    </Context.Provider>
  );
};

const useTabs = () => {
  return useContext(Context);
};

const TabMenu = ({ titles }) => {
  const { currentIndex, setCurrentIndex } = useTabs();

  return (
    <nav className="mb-4">
      <ul className="flex justify-around gap-2">
        {titles.map((title, i) => (
          <li
            className={`w-full text-center py-2 rounded hover:shadow-lg bg-gray-100 cursor-pointer capitalize transition duration-500 ease-in-out ${
              currentIndex === i ? 'bg-blue-500 text-white font-semibold' : ''
            }`}
            key={title}
            onClick={() => setCurrentIndex(i)}>
            {title}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const TabItem = ({ index, children }) => {
  const { currentIndex } = useTabs();

  return currentIndex === index ? children : null;
};

export { Tabs, TabMenu, TabItem };
