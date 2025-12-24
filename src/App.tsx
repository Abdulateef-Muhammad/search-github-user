import { useState, useMemo, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepositoryList from './components/RepositoryList';
import SortControls from './components/SortControls';
import FilterControls from './components/FilterControls';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ThemeToggle from './components/ThemeToggle';
import { useGitHubUser } from './hooks/useGitHubUser';
import { useGitHubRepos } from './hooks/useGitHubRepos';
import { sortRepositories, filterRepositories, getUniqueLanguages } from './utils/github';
import type { SortOption, SortDirection } from './types/github';
import { ThemeProvider } from './context/ThemeContext';
import { BsGithub } from 'react-icons/bs';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const { user, isLoading: isLoadingUser, error: userError } = useGitHubUser(username);
  const {
    repos,
    isLoading: isLoadingRepos,
    isLoadingMore,
    isReachingEnd,
    error: reposError,
    loadMore
  } = useGitHubRepos(username);

  // Get unique languages from all repos
  const availableLanguages = useMemo(() => getUniqueLanguages(repos), [repos]);

  // Apply filters and sorting
  const processedRepos = useMemo(() => {
    let filtered = filterRepositories(repos, selectedLanguage);
    return sortRepositories(filtered, sortBy, sortDirection);
  }, [repos, selectedLanguage, sortBy, sortDirection]);

  const handleSearch = useCallback((searchUsername: string) => {
    setUsername(searchUsername || null);
    setSelectedLanguage(null); // Reset filters on new search
  }, []);

  const handleSortChange = useCallback((newSortBy: SortOption, newDirection: SortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  }, []);

  const handleLanguageChange = useCallback((language: string | null) => {
    setSelectedLanguage(language);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen px-4 py-8 md:px-4 md:py-8 transition-colors duration-300" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-[1400px] md:max-w-[1400px] mx-auto">
          <header className="text-center mb-12 p-8 md:p-8 relative">
            <div className="absolute top-4 right-4 md:top-8 md:right-8">
              <ThemeToggle />
            </div>
            <div className='flex items-center justify-center gap-3'>
              <span>
                <BsGithub className='w-10 h-10' />
              </span>
              <h1 className="text-4xl md:text-4xl mb-2">
                GitHub User Search
              </h1>
            </div>
            <p className="m-0 text-lg md:text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              Discover GitHub users and explore their repositories
            </p>
          </header>

          <SearchBar onSearch={handleSearch} />

          {!username && (
            <div className="animate-fade-in flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
              <div className="text-[5rem] mb-6 opacity-70">🔍</div>
              <h2 className="mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Start Searching
              </h2>
              <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                Enter a GitHub username to view their profile and repositories
              </p>
            </div>
          )}

          {userError && (
            <ErrorMessage
              message={userError}
              onRetry={() => setUsername(username)}
            />
          )}

          {isLoadingUser && <LoadingSpinner />}

          {user && !userError && (
            <>
              <UserProfile user={user} />

              {reposError && (
                <ErrorMessage
                  message={reposError}
                  onRetry={() => setUsername(username)}
                />
              )}

              {!reposError && repos.length > 0 && (
                <>
                  <div className="border-t border-gray-300 flex items-center gap-8 p-6 mb-8 flex-wrap md:flex-row flex-col md:items-center md:gap-8">
                    <SortControls
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                      onSortChange={handleSortChange}
                    />
                    <div className="w-px h-10 md:block hidden shrink-0" style={{ background: 'var(--color-border)' }} />
                    <FilterControls
                      languages={availableLanguages}
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={handleLanguageChange}
                    />
                  </div>

                  <RepositoryList
                    repos={processedRepos}
                    isLoading={isLoadingRepos}
                    isLoadingMore={isLoadingMore || false}
                    isReachingEnd={isReachingEnd || false}
                    onLoadMore={loadMore}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
