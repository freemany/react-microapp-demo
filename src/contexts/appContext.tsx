import React, { useState, useContext, createContext } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ initValue, children }) => {
  const [props, setProps] = useState(initValue);
  const value = { props, setProps };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a App context provider");
  }

  return context;
};
