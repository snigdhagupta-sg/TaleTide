import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { stories, genres } from '../data/dummyData';
import StoryCard from '../components/StoryCard';
import GenreFilter from '../components/GenreFilter';
import BackButton from '../components/BackButton';
import './Home.css';

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredStories = stories.filter(story => {
    const genreMatch = selectedGenre === 'All' || story.genre === selectedGenre;
    const statusMatch = selectedStatus === 'All' || story.status === selectedStatus;
    return genreMatch && statusMatch;
  });

  const recentStories = stories.slice(0, 3);
  const trendingStories = stories.sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <div className="home">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">StoryHub</span>
            </h1>
            <p className="hero-subtitle">
              Where stories come alive through collaboration. Write, contribute, and watch stories evolve together.
            </p>
            <div className="hero-actions">
              <Link to="/create" className="btn btn-primary">
                Start Your Story
              </Link>
              <Link to="/ongoing" className="btn btn-secondary">
                Explore Stories
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="quick-nav">
          <h2>Explore Stories</h2>
          <div className="nav-buttons">
            <Link to="/ongoing" className="nav-card ongoing">
              <div className="nav-icon">📖</div>
              <div className="nav-content">
                <h3>Ongoing Stories</h3>
                <p>Join active collaborations</p>
              </div>
            </Link>
            <Link to="/completed" className="nav-card completed">
              <div className="nav-icon">✅</div>
              <div className="nav-content">
                <h3>Completed Stories</h3>
                <p>Read finished masterpieces</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Filters */}
        <section className="filters-section">
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
              <label>Status:</label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
                <option value="seeking">Seeking Contributors</option>
              </select>
            </div>
          </div>
        </section>

        {/* Recent Stories */}
        <section className="stories-section">
          <h2>Recent Stories</h2>
          <div className="stories-grid">
            {recentStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* Trending Stories */}
        <section className="stories-section">
          <h2>Trending Stories</h2>
          <div className="stories-grid">
            {trendingStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* All Filtered Stories */}
        {(selectedGenre !== 'All' || selectedStatus !== 'All') && (
          <section className="stories-section">
            <h2>Filtered Results</h2>
            <div className="stories-grid">
              {filteredStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
