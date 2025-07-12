import { createContext, useState, useContext } from "react";

const OpenContext = createContext();

export const OpenProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <OpenContext.Provider value={{ open, setOpen }}>
      {children}
    </OpenContext.Provider>
  );
};

export const useOpen = () => useContext(OpenContext);
export default OpenContext