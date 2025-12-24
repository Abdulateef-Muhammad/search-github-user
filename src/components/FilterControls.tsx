import { FiFilter, FiX } from 'react-icons/fi';

interface FilterControlsProps {
    languages: string[];
    selectedLanguage: string | null;
    onLanguageChange: (language: string | null) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
    languages,
    selectedLanguage,
    onLanguageChange
}) => {
    return (
        <div className="flex items-center gap-4 flex-wrap animate-fade-in">
            <span className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                <FiFilter size={16} />
                Filter by language:
            </span>
            <div className="relative">
                <select
                    className="min-w-[200px] md:min-w-[200px] cursor-pointer appearance-none bg-no-repeat pr-10 border p-1 px-2 rounded border-gray-400"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4L6 8L10 4' stroke='%238b949e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundPosition: 'right 1rem center'
                    }}
                    value={selectedLanguage || ''}
                    onChange={(e) => onLanguageChange(e.target.value || null)}
                >
                    <option value="">All Languages</option>
                    {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>
            {selectedLanguage && (
                <button
                    className="btn btn-ghost px-4 py-2 text-sm flex items-center gap-2"
                    onClick={() => onLanguageChange(null)}
                >
                    <FiX size={16} />
                    Clear
                </button>
            )}
        </div>
    );
};

export default FilterControls;
