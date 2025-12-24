import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-secondary p-2! rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-bg-elevated)]"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <FiSun className="animate-fade-in w-5 h-5" />
            ) : (
                <FiMoon className="animate-fade-in w-5 h-5" />
            )}
        </button>
    );
};

export default ThemeToggle;
