"use client";

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Magnetic from './Magnetic';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Add debugging
  React.useEffect(() => {
    console.log('Current theme:', theme);
    console.log('Document classes:', document.documentElement.className);
  }, [theme]);

  return (
    <Magnetic>
      <button
        onClick={toggleTheme}
        className="p-2 transition-all duration-300 ease-in-out"
        style={{ color: 'var(--link-color)' }}
        aria-label="Toggle theme"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <div className="relative w-6 h-6">
          <Sun 
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              theme === 'dark' 
                ? 'opacity-0 rotate-90 scale-0' 
                : 'opacity-100 rotate-0 scale-100'
            }`} 
          />
          <Moon 
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              theme === 'dark' 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 -rotate-90 scale-0'
            }`} 
          />
        </div>
      </button>
    </Magnetic>
  );
}
