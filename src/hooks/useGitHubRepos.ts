import { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import type { GitHubRepository } from '../types/github';
import { GITHUB_API_BASE } from '../utils/github';

const REPOS_PER_PAGE = 30;

const fetcher = async (url: string): Promise<GitHubRepository[]> => {
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('API rate limit exceeded. Please try again later.');
        }
        throw new Error('Failed to fetch repositories');
    }

    return response.json();
};

export const useGitHubRepos = (username: string | null) => {
    const getKey = (pageIndex: number, previousPageData: GitHubRepository[] | null) => {
        // If no username, don't fetch
        if (!username) return null;

        // If previous page is empty, we've reached the end
        if (previousPageData && previousPageData.length === 0) return null;

        // Return the URL for the current page
        return `${GITHUB_API_BASE}/users/${username}/repos?per_page=${REPOS_PER_PAGE}&page=${pageIndex + 1}&sort=updated`;
    };

    const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite<GitHubRepository[]>(
        getKey,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateFirstPage: false,
            shouldRetryOnError: false,
        }
    );

    const repos = useMemo(() => (data ? data.flat() : []), [data]);
    const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < REPOS_PER_PAGE);

    return {
        repos,
        isLoading,
        isLoadingMore,
        isReachingEnd,
        error: error?.message,
        loadMore: () => setSize(size + 1),
        isValidating,
    };
};
