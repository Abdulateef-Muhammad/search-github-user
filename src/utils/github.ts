import type { GitHubRepository, SortOption, SortDirection } from '../types/github';

export const GITHUB_API_BASE = 'https://api.github.com';

export const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
};

export const getLanguageColor = (language: string | null): string => {
    if (!language) return 'var(--lang-default)';

    const langMap: Record<string, string> = {
        'JavaScript': 'var(--lang-javascript)',
        'TypeScript': 'var(--lang-typescript)',
        'Python': 'var(--lang-python)',
        'Java': 'var(--lang-java)',
        'Go': 'var(--lang-go)',
        'Rust': 'var(--lang-rust)',
        'Ruby': 'var(--lang-ruby)',
        'PHP': 'var(--lang-php)',
        'C': 'var(--lang-c)',
        'C++': 'var(--lang-cpp)',
        'C#': 'var(--lang-csharp)',
        'Swift': 'var(--lang-swift)',
        'Kotlin': 'var(--lang-kotlin)',
        'HTML': 'var(--lang-html)',
        'CSS': 'var(--lang-css)',
        'Shell': 'var(--lang-shell)',
    };

    return langMap[language] || 'var(--lang-default)';
};

export const sortRepositories = (
    repos: GitHubRepository[],
    sortBy: SortOption,
    direction: SortDirection
): GitHubRepository[] => {
    const sorted = [...repos].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'stars':
                comparison = a.stargazers_count - b.stargazers_count;
                break;
            case 'forks':
                comparison = a.forks_count - b.forks_count;
                break;
            case 'updated':
                comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
                break;
        }

        return direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
};

export const filterRepositories = (
    repos: GitHubRepository[],
    language: string | null
): GitHubRepository[] => {
    if (!language) return repos;
    return repos.filter(repo => repo.language === language);
};

export const getUniqueLanguages = (repos: GitHubRepository[]): string[] => {
    const languages = repos
        .map(repo => repo.language)
        .filter((lang): lang is string => lang !== null);

    return Array.from(new Set(languages)).sort();
};

export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
