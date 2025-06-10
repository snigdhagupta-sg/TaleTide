import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { stories, users, genres } from '../data/dummyData';
import StoryCard from '../components/StoryCard';
import BackButton from '../components/BackButton';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    genre: 'All',
    status: 'All',
    sortBy: 'relevance'
  });

  const [results, setResults] = useState({
    stories: [],
    users: [],
    total: 0
  });

  useEffect(() => {
    if (query) {
      const searchQuery = query.toLowerCase();
      
      // Search stories
      const matchingStories = stories.filter(story => 
        story.title.toLowerCase().includes(searchQuery) ||
        story.summary.toLowerCase().includes(searchQuery) ||
        story.genre.toLowerCase().includes(searchQuery) ||
        story.author.toLowerCase().includes(searchQuery)
      );

      // Search users
      const matchingUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery) ||
        user.bio?.toLowerCase().includes(searchQuery)
      );

      setResults({
        stories: matchingStories,
        users: matchingUsers,
        total: matchingStories.length + matchingUsers.length
      });
    }
  }, [query]);

  const filteredStories = results.stories.filter(story => {
    const genreMatch = filters.genre === 'All' || story.genre === filters.genre;
    const statusMatch = filters.status === 'All' || story.status === filters.status;
    return genreMatch && statusMatch;
  });

  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (filters.sortBy) {
      case 'date':
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      case 'likes':
        return b.likes - a.likes;
      case 'contributions':
        return b.contributions - a.contributions;
      default:
        return 0; // relevance (keep original order)
    }
  });

  const getDisplayResults = () => {
    switch (activeTab) {
      case 'stories':
        return { stories: sortedStories, users: [] };
      case 'users':
        return { stories: [], users: results.users };
      default:
        return { stories: sortedStories, users: results.users };
    }
  };

  const displayResults = getDisplayResults();

  return (
    <div className="search-results">
      <div className="container">
        
        {/* Search Header */}
        <div className="search-header">
          <h1>Search Results</h1>
          <div className="search-query">
            Showing results for: <span className="query-text">"{query}"</span>
          </div>
          <div className="results-count">
            {results.total} results found
          </div>
        </div>

        {results.total > 0 ? (
          <>
            {/* Search Tabs */}
            <div className="search-tabs">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({results.total})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
                onClick={() => setActiveTab('stories')}
              >
                Stories ({results.stories.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                Users ({results.users.length})
              </button>
            </div>

            {/* Filters (only show for stories) */}
            {(activeTab === 'all' || activeTab === 'stories') && results.stories.length > 0 && (
              <div className="search-filters">
                <div className="filter-group">
                  <label>Genre:</label>
                  <select 
                    value={filters.genre} 
                    onChange={(e) => setFilters({...filters, genre: e.target.value})}
                    className="filter-select"
                  >
                    <option value="All">All Genres</option>
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                <div className="filter-group">
                  <label>Status:</label>
                  <select 
                    value={filters.status} 
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="filter-select"
                  >
                    <option value="All">All Status</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                    <option value="seeking">Seeking Contributors</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Sort by:</label>
                  <select 
                    value={filters.sortBy} 
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="filter-select"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="date">Recent</option>
                    <option value="likes">Most Liked</option>
                    <option value="contributions">Most Contributions</option>
                  </select>
                </div>
              </div>
            )}

            {/* Results */}
            <div className="search-content">
              {/* Stories Results */}
              {displayResults.stories.length > 0 && (
                <section className="results-section">
                  <h2>Stories</h2>
                  <div className="stories-grid">
                    {displayResults.stories.map(story => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>
                </section>
              )}

              {/* Users Results */}
              {displayResults.users.length > 0 && (
                <section className="results-section">
                  <h2>Users</h2>
                  <div className="users-grid">
                    {displayResults.users.map(user => (
                      <Link key={user.username} to={`/user/${user.username}`} className="user-card">
                        <img src={user.avatar} alt={user.username} className="user-avatar" />
                        <div className="user-info">
                          <h3 className="user-name">{user.username}</h3>
                          <p className="user-bio">{user.bio}</p>
                          <div className="user-stats">
                            <span>{user.storiesPublished} stories</span>
                            <span>{user.totalContributions} contributions</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </>
        ) : (
          <div className="no-results">
            <h3>No results found</h3>
            <p>Try adjusting your search terms or browse our categories:</p>
            <div className="browse-links">
              <Link to="/ongoing" className="browse-link">Ongoing Stories</Link>
              <Link to="/completed" className="browse-link">Completed Stories</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
