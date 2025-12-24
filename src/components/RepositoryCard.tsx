import React from 'react';
import type { GitHubRepository } from '../types/github';
import { formatNumber, formatDate, getLanguageColor } from '../utils/github';
import { FiStar, FiGitPullRequest, FiEye, FiFileText, FiBook } from 'react-icons/fi';

interface RepositoryCardProps {
    repo: GitHubRepository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group border hover:border-[--color-border-light] rounded-2xl p-6 h-full flex flex-col no-underline text-[--color-text-primary] relative overflow-hidden transition-all duration-300"
            style={{ borderColor: 'var(--color-border)' }}
        >
            <div
                className="absolute top-0 left-0 w-1 h-full bg-[--color-primary] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold m-0 flex items-center gap-2 text-[--color-primary] group-hover:text-[--color-primary-light] transition-colors duration-200">
                    <FiBook className="shrink-0" size={18} />
                    {repo.name}
                </h3>
            </div>

            <p className="flex-1 text-[0.95rem] mb-6 leading-relaxed text-[--color-text-secondary] line-clamp-3">
                {repo.description || 'No description available'}
            </p>

            <div className="flex flex-col gap-4 mt-auto">
                <div className="flex flex-wrap gap-4 text-sm text-[--color-text-secondary]">
                    {repo.language && (
                        <div className="flex items-center gap-1.5">
                            <span
                                className="w-3 h-3 rounded-full shadow-sm"
                                style={{ backgroundColor: getLanguageColor(repo.language) }}
                            />
                            {repo.language}
                        </div>
                    )}
                    <div className="flex items-center gap-1.5">
                        <FiStar className="text-[--color-secondary]" size={16} />
                        {formatNumber(repo.stargazers_count)}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FiGitPullRequest className="text-[--color-accent]" size={16} />
                        {formatNumber(repo.forks_count)}
                    </div>
                    <div className="flex items-center gap-1.5 sm:flex">
                        <FiEye className="text-[--color-text-tertiary]" size={16} />
                        {formatNumber(repo.watchers_count)}
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[--color-text-tertiary] pt-4 border-t border-(--color-border)">
                    <span className="flex items-center gap-1">
                        {repo.license && (
                            <>
                                <FiFileText size={14} />
                                {repo.license.spdx_id || repo.license.name}
                                <span className="mx-1">•</span>
                            </>
                        )}
                        Updated {formatDate(repo.updated_at)}
                    </span>
                </div>
            </div>
        </a>
    );
};

export default RepositoryCard;
