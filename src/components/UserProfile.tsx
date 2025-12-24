import React from 'react';
import type { GitHubUser } from '../types/github';
import { formatNumber } from '../utils/github';

interface UserProfileProps {
    user: GitHubUser;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    return (
        <div className="animate-fade-in p-8 mb-8">
            <div className="flex items-center gap-6 mb-6 md:flex-row flex-col md:text-left text-center">
                <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-20 h-20 md:w-20 md:h-20 rounded-full"
                />
                <div className="flex-1">
                    <h2
                        className="m-0 text-2xl mb-0"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-text-secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {user.name || user.login}
                    </h2>
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base transition-colors duration-150"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        @{user.login}
                    </a>
                </div>
            </div>

            {user.bio && (
                <p className="leading-6 mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    {user.bio}
                </p>
            )}

            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b md:justify-start justify-center" style={{ borderColor: 'var(--color-border)' }}>
                {user.location && (
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{user.location}</span>
                    </div>
                )}

                {user.blog && (
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        <a
                            href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-150"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {user.blog}
                        </a>
                    </div>
                )}

                {user.twitter_username && (
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                        <a
                            href={`https://twitter.com/${user.twitter_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-150"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            @{user.twitter_username}
                        </a>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center">
                <div className="text-center">
                    <div
                        className="text-2xl font-bold"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {formatNumber(user.followers)}
                    </div>
                    <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                        Followers
                    </div>
                </div>
                <div className="w-px h-10" style={{ background: 'var(--color-border)' }}></div>
                <div className="text-center">
                    <div
                        className="text-2xl font-bold"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {formatNumber(user.following)}
                    </div>
                    <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                        Following
                    </div>
                </div>
                <div className="w-px h-10" style={{ background: 'var(--color-border)' }}></div>
                <div className="text-center">
                    <div
                        className="text-2xl font-bold"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {formatNumber(user.public_repos)}
                    </div>
                    <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                        Repositories
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
