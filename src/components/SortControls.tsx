import React from 'react';
import type { SortOption, SortDirection } from '../types/github';
import { FiStar, FiGitPullRequest, FiClock, FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface SortControlsProps {
    sortBy: SortOption;
    sortDirection: SortDirection;
    onSortChange: (sortBy: SortOption, direction: SortDirection) => void;
}

const SortControls: React.FC<SortControlsProps> = ({
    sortBy,
    sortDirection,
    onSortChange
}) => {
    const handleSortClick = (option: SortOption) => {
        if (sortBy === option) {
            onSortChange(option, sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            onSortChange(option, 'desc');
        }
    };

    const getIcon = (option: SortOption) => {
        switch (option) {
            case 'stars':
                return <FiStar size={16} />;
            case 'forks':
                return <FiGitPullRequest size={16} />;
            case 'updated':
                return <FiClock size={16} />;
        }
    };

    const getDirectionIcon = (option: SortOption) => {
        if (sortBy !== option) return null;

        return sortDirection === 'asc' ? (
            <FiChevronUp size={16} className="animate-fade-in" />
        ) : (
            <FiChevronDown size={16} className="animate-fade-in" />
        );
    };

    return (
        <div className="flex flex-wrap gap-3 animate-fade-in">
            <span className="flex items-center text-sm font-medium mr-2" style={{ color: 'var(--color-text-secondary)' }}>
                Sort by:
            </span>

            <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 cursor-pointer text-sm font-medium ${sortBy === 'stars'
                    ? 'bg-[var(--color-primary-light)] text-white border-transparent shadow-md'
                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)] hover:border-[var(--color-border-light)]'
                    }`}
                style={sortBy === 'stars' ? { background: 'var(--color-primary)' } : {}}
                onClick={() => handleSortClick('stars')}
            >
                {getIcon('stars')}
                Stars
                {getDirectionIcon('stars')}
            </button>

            <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 cursor-pointer text-sm font-medium ${sortBy === 'forks'
                    ? 'bg-[var(--color-primary-light)] text-white border-transparent shadow-md'
                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)] hover:border-[var(--color-border-light)]'
                    }`}
                style={sortBy === 'forks' ? { background: 'var(--color-primary)' } : {}}
                onClick={() => handleSortClick('forks')}
            >
                {getIcon('forks')}
                Forks
                {getDirectionIcon('forks')}
            </button>

            <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 cursor-pointer text-sm font-medium ${sortBy === 'updated'
                    ? 'bg-[var(--color-primary-light)] text-white border-transparent shadow-md'
                    : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)] hover:border-[var(--color-border-light)]'
                    }`}
                style={sortBy === 'updated' ? { background: 'var(--color-primary)' } : {}}
                onClick={() => handleSortClick('updated')}
            >
                {getIcon('updated')}
                Updated
                {getDirectionIcon('updated')}
            </button>
        </div>
    );
};

export default SortControls;
