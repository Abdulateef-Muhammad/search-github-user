import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SortControls from '../SortControls';
import type { SortOption, SortDirection } from '../../types/github';

describe('SortControls', () => {
    const mockOnSortChange = vi.fn();

    const defaultProps = {
        sortBy: 'stars' as SortOption,
        sortDirection: 'desc' as SortDirection,
        onSortChange: mockOnSortChange,
    };

    it('renders correctly', () => {
        render(<SortControls {...defaultProps} />);
        expect(screen.getByText('Stars')).toBeInTheDocument();
        expect(screen.getByText('Forks')).toBeInTheDocument();
        expect(screen.getByText('Updated')).toBeInTheDocument();
    });

    it('calls onSortChange when clicked', () => {
        render(<SortControls {...defaultProps} />);
        fireEvent.click(screen.getByText('Forks'));
        expect(mockOnSortChange).toHaveBeenCalled();
    });
});
