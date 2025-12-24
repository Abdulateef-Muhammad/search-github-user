import useSWR from 'swr';
import type { GitHubUser } from '../types/github';
import { GITHUB_API_BASE } from '../utils/github';

const fetcher = async (url: string): Promise<GitHubUser> => {
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('User not found');
        }
        if (response.status === 403) {
            throw new Error('API rate limit exceeded. Please try again later.');
        }
        throw new Error('Failed to fetch user data');
    }

    return response.json();
};

export const useGitHubUser = (username: string | null) => {
    const { data, error, isLoading } = useSWR<GitHubUser>(
        username ? `${GITHUB_API_BASE}/users/${username}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    return {
        user: data,
        isLoading,
        error: error?.message,
    };
};
