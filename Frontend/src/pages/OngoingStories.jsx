import React, { useState } from 'react';
import { stories, genres } from '../data/dummyData';
import StoryCard from '../components/StoryCard';
import BackButton from '../components/BackButton';
import './OngoingStories.css';

const OngoingStories = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('updated');

  const ongoingStories = stories.filter(story => 
    story.status === 'ongoing' || story.status === 'seeking'
  );

  const filteredStories = ongoingStories.filter(story => 
    selectedGenre === 'All' || story.genre === selectedGenre
  );

  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case 'updated':
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'contributions':
        return b.contributions - a.contributions;
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  return (
    <div className="ongoing-stories">
      <div className="container">
        
        {/* Page Header */}
        <div className="page-header">
          <h1>📖 Ongoing Stories</h1>
          <p>Join active collaborations and help shape ongoing narratives</p>
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
                <option value="updated">Recently Updated</option>
                <option value="created">Newest First</option>
                <option value="contributions">Most Contributions</option>
                <option value="likes">Most Liked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">{ongoingStories.length}</span>
            <span className="stat-label">Active Stories</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {ongoingStories.reduce((sum, story) => sum + story.contributions, 0)}
            </span>
            <span className="stat-label">Total Contributions</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {ongoingStories.filter(story => story.status === 'seeking').length}
            </span>
            <span className="stat-label">Seeking Contributors</span>
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
            <h3>No ongoing stories found</h3>
            <p>Try adjusting your filters or check back later for new stories.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OngoingStories;