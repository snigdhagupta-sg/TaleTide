import React from 'react';
import { Link } from 'react-router-dom';
import './StoryCard.css';

const StoryCard = ({ story }) => {
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
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Link to={`/story/${story.id}`} className="story-card">
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
      </div>
      
      <div className="story-content">
        <h3 className="story-title">{story.title}</h3>
        <p className="story-summary">{story.summary}</p>
        
        <div className="story-author">
          <img 
            src={story.authorAvatar} 
            alt={story.author}
            className="author-avatar"
          />
          <Link 
            to={`/user/${story.author}`} 
            className="author-name"
            onClick={(e) => e.stopPropagation()}
          >
            {story.author}
          </Link>
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
          <span>{formatDate(story.updatedAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;
