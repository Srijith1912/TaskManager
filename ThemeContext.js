import React, { createContext, useContext, useState } from "react";

const ThemeContent = createContext();

export function ThemeProvider({children}){

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => 
    setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContent.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContent.Provider>
  );

}
  export function useTheme(){
    return useContext(ThemeContent);
  }
