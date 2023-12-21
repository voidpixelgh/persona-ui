import React, { createContext, useContext, useState } from 'react';

const ResponseContext = createContext({});

export const useResponse = () => useContext(ResponseContext);

export const ResponseProvider = ({ children }) => {
  const [response, setResponse] = useState(null);

  return (
    <ResponseContext.Provider value={{ response, setResponse }}>
      {children}
    </ResponseContext.Provider>
  );
};