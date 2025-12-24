import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThemeToggle from '../ThemeToggle';
import { ThemeProvider } from '../../context/ThemeContext';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

describe('ThemeToggle', () => {
    beforeEach(() => {
        // Clear localStorage and reset document class
        localStorage.clear();
        document.documentElement.className = '';
    });

    it('renders correctly', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );
        const button = screen.getByRole('button', { name: /toggle theme/i });
        expect(button).toBeInTheDocument();
    });

    it('toggles theme from dark (default) to light', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );

        const button = screen.getByRole('button', { name: /toggle theme/i });

        // Initial state check (assuming default is dark)
        expect(document.documentElement).toHaveClass('dark');
        expect(button).toHaveAttribute('title', 'Switch to light mode');

        // Click to toggle
        fireEvent.click(button);

        // Expect light mode
        expect(document.documentElement).toHaveClass('light');
        expect(document.documentElement).not.toHaveClass('dark');
        expect(button).toHaveAttribute('title', 'Switch to dark mode');
    });

    it('persists theme in localStorage', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );
        const button = screen.getByRole('button', { name: /toggle theme/i });

        fireEvent.click(button); // Switch to light
        expect(localStorage.getItem('theme')).toBe('light');

        fireEvent.click(button); // Switch back to dark
        expect(localStorage.getItem('theme')).toBe('dark');
    });
});
