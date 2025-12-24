import React, { useEffect, useRef, useCallback } from 'react';
import type { GitHubRepository } from '../types/github';
import RepositoryCard from './RepositoryCard';
import LoadingSpinner from './LoadingSpinner';

interface RepositoryListProps {
    repos: GitHubRepository[];
    isLoading: boolean;
    isLoadingMore: boolean;
    isReachingEnd: boolean;
    onLoadMore: () => void;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
    repos,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    onLoadMore,
}) => {
    const observerTarget = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries;
            if (target.isIntersecting && !isLoadingMore && !isReachingEnd) {
                onLoadMore();
            }
        },
        [isLoadingMore, isReachingEnd, onLoadMore]
    );

    useEffect(() => {
        const element = observerTarget.current;
        if (!element) return;

        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
        });

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [handleObserver]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (repos.length === 0) {
        return (
            <div className="animate-fade-in flex flex-col items-center justify-center p-12 text-center">
                <div className="text-6xl mb-4 opacity-50">📦</div>
                <h3 className="m-0 mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    No repositories found
                </h3>
                <p className="m-0" style={{ color: 'var(--color-text-secondary)' }}>
                    Try adjusting your filters or search for a different user.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] grid-cols-1 gap-6 md:gap-6 mb-8">
                {repos.map((repo, index) => (
                    <RepositoryCard key={`${repo.id}-${index}`} repo={repo} />
                ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={observerTarget} className="h-5 my-6" />

            {isLoadingMore && (
                <div className="flex justify-center py-6">
                    <LoadingSpinner />
                </div>
            )}

            {isReachingEnd && repos.length > 0 && (
                <div className="animate-fade-in text-center p-8" style={{ color: 'var(--color-text-secondary)' }}>
                    <p className="m-0 text-sm">You've reached the end! 🎉</p>
                </div>
            )}
        </div>
    );
};

export default RepositoryList;
