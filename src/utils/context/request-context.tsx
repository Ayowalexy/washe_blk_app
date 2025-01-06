import { createContext, ReactNode, useState } from "react";

interface MyContextType {
  value: string;
  setValue: (value: string) => void;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<any> = ({ children }) => {
  const [value, setValue] = useState<string>("pickup");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};
