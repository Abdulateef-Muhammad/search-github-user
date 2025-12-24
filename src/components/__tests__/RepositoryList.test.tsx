import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RepositoryList from '../RepositoryList';
import type { GitHubRepository } from '../../types/github';

// Mock IntersectionObserver
class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}

window.IntersectionObserver = MockIntersectionObserver as any;

describe('RepositoryList', () => {
    const defaultProps = {
        repos: [] as GitHubRepository[],
        isLoading: false,
        isLoadingMore: false,
        isReachingEnd: false,
        onLoadMore: vi.fn(),
    };

    const mockRepo: GitHubRepository = {
        id: 1,
        name: 'test-repo',
        full_name: 'testuser/test-repo',
        description: 'Test Description',
        html_url: 'https://github.com/test/test-repo',
        stargazers_count: 10,
        forks_count: 5,
        updated_at: '2023-01-01T00:00:00Z',
        language: 'TypeScript',
        homepage: null,
        watchers_count: 0,
        open_issues_count: 0,
        created_at: '2023-01-01T00:00:00Z',
        pushed_at: '2023-01-01T00:00:00Z',
        size: 0,
        default_branch: 'main',
        topics: [],
        visibility: 'public',
        fork: false,
        archived: false,
        license: null,
        // owner removed to match current type definition, will add back if needed
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state', () => {
        render(<RepositoryList {...defaultProps} isLoading={true} />);
        expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('renders empty state', () => {
        render(<RepositoryList {...defaultProps} />);
        expect(screen.getByText(/no repositories found/i)).toBeInTheDocument();
    });

    it('renders repositories', () => {
        const repos = [mockRepo];
        render(<RepositoryList {...defaultProps} repos={repos} />);
        expect(screen.getByText('test-repo')).toBeInTheDocument();
    });
});
