export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string | null;
    bio: string | null;
    location: string | null;
    email: string | null;
    blog: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    size: number;
    default_branch: string;
    topics: string[];
    visibility: string;
    fork: boolean;
    archived: boolean;
    license: {
        key: string;
        name: string;
        spdx_id: string;
        url: string;
        node_id: string;
    } | null;
}

export type SortOption = 'stars' | 'forks' | 'updated';
export type SortDirection = 'asc' | 'desc';

export interface FilterOptions {
    language: string | null;
}

export interface SortOptions {
    sortBy: SortOption;
    direction: SortDirection;
}
