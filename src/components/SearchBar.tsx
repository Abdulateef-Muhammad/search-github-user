import React, { useState, useEffect } from 'react';
import { debounce } from '../utils/github';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
    onSearch: (username: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = 'Search GitHub users...'
}) => {
    const [inputValue, setInputValue] = useState('');

    const debouncedSearch = React.useMemo(
        () => debounce((value: string) => {
            if (value.trim()) {
                onSearch(value.trim());
            }
        }, 500),
        [onSearch]
    );

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => { };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        debouncedSearch(value);
    };

    const handleClear = () => {
        setInputValue('');
        onSearch('');
    };

    return (
        <div className="p-4 mb-8 flex justify-center">
            <div className="relative flex items-center w-full sm:w-10/12 md:w-7/12">
                <FiSearch
                    className="absolute left-4 pointer-events-none z-10"
                    style={{ color: 'var(--color-text-tertiary)' }}
                    size={20}
                />
                <input
                    type="text"
                    className="w-full pl-12 pr-12 text-base border transition-all duration-250 rounded-lg focus:border-[--color-primary] p-2"
                    style={{
                        borderColor: 'var(--color-border)',
                        background: 'var(--color-bg-primary)',
                        boxShadow: '0 0 0 4px hsla(var(--color-primary), var(--color-primary-s), var(--color-primary-l), 0.1)'
                    }}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleChange}
                />
                {inputValue && (
                    <button
                        className="absolute right-4 bg-transparent border-none cursor-pointer p-1 flex items-center justify-center rounded-md transition-all duration-150 hover:bg-[--color-bg-tertiary]"
                        style={{ color: 'var(--color-text-tertiary)' }}
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <FiX size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
