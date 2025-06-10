import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { stories } from '../data/dummyData';
import ContributionForm from '../components/ContributionForm';
import './StoryDetail.css';

const StoryDetail = () => {
  const { id } = useParams();
  const { user, showContributors } = useAuth();
  const [showContributionForm, setShowContributionForm] = useState(false);
  
  const story = stories.find(s => s.id === parseInt(id));

  if (!story) {
    return (
      <div className="story-detail">
        <div className="container">
          <div className="error-state">
            <h2>Story not found</h2>
            <p>The story you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'var(--success)';
      case 'completed': return 'var(--accent-primary)';
      case 'paused': return 'var(--warning)';
      case 'seeking': return 'var(--accent-tertiary)';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ongoing': return 'Ongoing';
      case 'completed': return 'Completed';
      case 'paused': return 'Paused';
      case 'seeking': return 'Seeking Contributors';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const canContribute = story.status === 'ongoing' || story.status === 'seeking';

  return (
    <div className="story-detail">
      <div className="container">
        {/* Story Header */}
        <div className="story-header">
          <div className="story-meta">
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(story.status) }}
            >
              {getStatusText(story.status)}
            </span>
            <span className="genre-tag">{story.genre}</span>
          </div>
          
          <h1 className="story-title">{story.title}</h1>
          
          <div className="story-author-info">
            <img 
              src={story.authorAvatar} 
              alt={story.author}
              className="author-avatar"
            />
            <div className="author-details">
              <Link to={`/user/${story.author}`} className="author-name">
                {story.author}
              </Link>
              <span className="story-date">
                Created {formatDate(story.createdAt)}
              </span>
            </div>
          </div>

          <div className="story-stats">
            <div className="stat">
              <span className="stat-icon">📝</span>
              <span>{story.contributions} contributions</span>
            </div>
            <div className="stat">
              <span className="stat-icon">❤️</span>
              <span>{story.likes} likes</span>
            </div>
            <div className="stat">
              <span className="stat-icon">📅</span>
              <span>Updated {formatDate(story.updatedAt)}</span>
            </div>
          </div>

          {canContribute && (
            <button 
              className="contribute-btn btn btn-primary"
              onClick={() => setShowContributionForm(true)}
            >
              ✍️ Contribute to Story
            </button>
          )}
        </div>

        {/* Story Content */}
        <div className="story-content">
          <div className="story-summary">
            <h3>Summary</h3>
            <p>{story.summary}</p>
          </div>

          <div className="story-chapters">
            <h3>Story</h3>
            {story.chapters?.map((chapter, index) => (
              <div key={chapter.id} className="chapter">
                <div className="chapter-content">
                  {chapter.content}
                </div>
                {showContributors && (
                  <div className="chapter-author">
                    <img 
                      src={chapter.authorAvatar} 
                      alt={chapter.author}
                      className="chapter-author-avatar"
                    />
                    <div className="chapter-author-info">
                      <Link 
                        to={`/user/${chapter.author}`} 
                        className="chapter-author-name"
                      >
                        {chapter.author}
                      </Link>
                      <span className="chapter-date">
                        {formatDate(chapter.timestamp)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {story.status === 'completed' && (
            <div className="story-completed">
              <h4>🎉 Story Complete!</h4>
              <p>This collaborative masterpiece has reached its conclusion. Thank you to all contributors!</p>
            </div>
          )}
        </div>

        {/* Contribution Form Modal */}
        {showContributionForm && (
          <ContributionForm 
            story={story}
            onClose={() => setShowContributionForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
