import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => 
    setTheme(theme === 'light' ? 'dark' : 'light');

  const themeStyles = {
    container: theme === 'light' ? 'bg-gray-100 text-black border border-gray-200 shadow-lg' : 'bg-gray-900 text-white border border-gray-700 shadow-lg',
    input: theme === 'light' ? 'border-gray-300' : 'border-gray-600 bg-gray-800 text-white',
    listItem: theme === 'light' ? 'bg-white shadow' : 'bg-gray-800 shadow',
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
