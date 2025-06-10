import React, { useState } from 'react';
import { stories, genres } from '../data/dummyData';
import StoryCard from '../components/StoryCard';
import BackButton from '../components/BackButton';
import './CompletedStories.css';

const CompletedStories = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('completed');

  const completedStories = stories.filter(story => story.status === 'completed');

  const filteredStories = completedStories.filter(story => 
    selectedGenre === 'All' || story.genre === selectedGenre
  );

  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case 'completed':
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      case 'contributions':
        return b.contributions - a.contributions;
      case 'likes':
        return b.likes - a.likes;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="completed-stories">
      <div className="container">
        
        {/* Page Header */}
        <div className="page-header">
          <h1>✅ Completed Stories</h1>
          <p>Explore finished collaborative masterpieces created by our community</p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters">
            <div className="filter-group">
              <label>Genre:</label>
              <select 
                value={selectedGenre} 
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="completed">Recently Completed</option>
                <option value="likes">Most Liked</option>
                <option value="contributions">Most Collaborative</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">{completedStories.length}</span>
            <span className="stat-label">Completed Stories</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {completedStories.reduce((sum, story) => sum + story.contributions, 0)}
            </span>
            <span className="stat-label">Total Contributions</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {completedStories.reduce((sum, story) => sum + story.likes, 0)}
            </span>
            <span className="stat-label">Total Likes</span>
          </div>
        </div>

        {/* Achievement Banner */}
        <div className="achievement-banner">
          <div className="achievement-content">
            <div className="achievement-icon">🏆</div>
            <div className="achievement-text">
              <h3>Hall of Fame</h3>
              <p>These stories represent the best of collaborative storytelling - each one a unique journey shaped by multiple creative minds working together.</p>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        {sortedStories.length > 0 ? (
          <div className="stories-grid">
            {sortedStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No completed stories found</h3>
            <p>Try adjusting your filters or check back later as more stories are completed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedStories;
