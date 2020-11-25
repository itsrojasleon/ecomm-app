import React, { createContext, useReducer } from 'react';

const createDataContext = (reducer, actions, defaultValue) => {
  const Context = createContext(null);

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export { createDataContext };
