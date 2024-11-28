import React, { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext();

const Context = ({children}) => {
  return (
    <>
      <ContextProvider.Provider value={{}}>{children}</ContextProvider.Provider>
    </>
  );
};

export default Context;
