import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { users, stories } from '../data/dummyData';
import StoryCard from '../components/StoryCard';
import './UserProfile.css';

const UserProfile = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('published');
  
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return (
      <div className="user-profile">
        <div className="container">
          <div className="error-state">
            <h2>User not found</h2>
            <p>The user you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const userStories = stories.filter(story => story.author === username);
  const contributedStories = stories.filter(story => 
    story.chapters?.some(chapter => chapter.author === username)
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="user-profile">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={user.avatar} alt={user.username} />
          </div>
          <div className="profile-info">
            <h1 className="profile-username">{user.username}</h1>
            <p className="profile-bio">{user.bio || 'This user hasn\'t written a bio yet.'}</p>
            <p className="profile-join-date">Joined {formatDate(user.joinDate)}</p>
          </div>
          <div className="profile-stats">
            <div className="stat-card">
              <span className="stat-number">{user.storiesPublished}</span>
              <span className="stat-label">Stories Published</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{user.storiesContributed}</span>
              <span className="stat-label">Stories Contributed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{user.totalContributions}</span>
              <span className="stat-label">Total Contributions</span>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'published' ? 'active' : ''}`}
            onClick={() => setActiveTab('published')}
          >
            📚 Published Stories ({userStories.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contributed' ? 'active' : ''}`}
            onClick={() => setActiveTab('contributed')}
          >
            ✍️ Contributed Stories ({contributedStories.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'published' && (
            <div className="published-stories">
              {userStories.length > 0 ? (
                <div className="stories-grid">
                  {userStories.map(story => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No published stories</h3>
                  <p>{user.username} hasn't published any stories yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contributed' && (
            <div className="contributed-stories">
              {contributedStories.length > 0 ? (
                <div className="stories-grid">
                  {contributedStories.map(story => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No contributed stories</h3>
                  <p>{user.username} hasn't contributed to any stories yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
