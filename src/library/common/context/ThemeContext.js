import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) {
        setIsDark(saved === 'dark');
      } else {
        // respect system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(prefersDark);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export default ThemeContext;
