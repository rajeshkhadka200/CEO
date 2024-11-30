import React, { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext();

const Context = ({ children }) => {
  const [extraDesc, setExtraDesc] = useState("");

  return (
    <>
      <ContextProvider.Provider
        value={{
          extraDesc,
          setExtraDesc,
        }}
      >
        {children}
      </ContextProvider.Provider>
    </>
  );
};

export default Context;
