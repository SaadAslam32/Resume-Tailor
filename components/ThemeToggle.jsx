
'use client';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 shadow-sm hover:bg-white/20 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FiMoon className="text-indigo-600 text-xl" />
      ) : (
        <FiSun className="text-yellow-400 text-xl" />
      )}
    </button>
  );
}