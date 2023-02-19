import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [bgTheme, setBgTheme] = useState('bg-light');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('bgTheme');
    if (savedTheme) {
      setBgTheme(savedTheme);
    } else {
      setBgTheme(prefersDarkMode ? 'bg-dark' : 'bg-light');
    }
  }, []);

  const toggleTheme = () => {
    setBgTheme(bgTheme === 'bg-light' ? 'bg-dark' : 'bg-light');
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (bgTheme === 'bg-dark') {
      document.body.classList.remove('bg-light');
      document.body.classList.add('bg-dark');
      document.querySelector('.addTask').classList.remove('light');
      document.querySelector('.addTask').classList.add('dark');
    } else {
      document.body.classList.remove('bg-dark');
      document.body.classList.add('bg-light');
      document.querySelector('.addTask').classList.remove('dark');
      document.querySelector('.addTask').classList.add('light');
    }
    localStorage.setItem('bgTheme', bgTheme);
  }, [bgTheme]);

  useEffect(() => {
    const tableElements = document.querySelectorAll('.task');
    tableElements.forEach((element) => {
      if (theme === 'dark') {
        element.classList.remove('light');
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
        element.classList.add('light');
      }
    });
    localStorage.setItem('theme', theme);
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ bgTheme, toggleTheme, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
