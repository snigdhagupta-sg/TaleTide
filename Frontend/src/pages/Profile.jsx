import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { stories, contributions } from '../data/dummyData';
import StoryCard from '../components/StoryCard';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('published');

  const userStories = stories.filter(story => story.author === user?.username);
  const userContributions = contributions.filter(contribution => 
    contribution.author === user?.username
  );

  const contributedStories = stories.filter(story => 
    story.chapters?.some(chapter => chapter.author === user?.username)
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="profile">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={user?.avatar} alt={user?.username} />
          </div>
          <div className="profile-info">
            <h1 className="profile-username">{user?.username}</h1>
            <p className="profile-email">{user?.email}</p>
            <p className="profile-join-date">Joined {formatDate(user?.joinDate)}</p>
          </div>
          <div className="profile-stats">
            <div className="stat-card">
              <span className="stat-number">{user?.storiesPublished}</span>
              <span className="stat-label">Stories Published</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{user?.storiesContributed}</span>
              <span className="stat-label">Stories Contributed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{user?.totalContributions}</span>
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
          <button 
            className={`tab-btn ${activeTab === 'contributions' ? 'active' : ''}`}
            onClick={() => setActiveTab('contributions')}
          >
            📝 My Contributions ({userContributions.length})
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
                  <h3>No published stories yet</h3>
                  <p>Start your storytelling journey today!</p>
                  <Link to="/create" className="btn btn-primary">
                    Create Your First Story
                  </Link>
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
                  <h3>No contributed stories yet</h3>
                  <p>Find an ongoing story and add your voice!</p>
                  <Link to="/ongoing" className="btn btn-primary">
                    Explore Ongoing Stories
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contributions' && (
            <div className="contributions-list">
              {userContributions.length > 0 ? (
                <div className="contributions-grid">
                  {userContributions.map(contribution => (
                    <div key={contribution.id} className="contribution-card">
                      <div className="contribution-header">
                        <Link 
                          to={`/story/${contribution.storyId}`}
                          className="contribution-story-title"
                        >
                          {contribution.storyTitle}
                        </Link>
                        <span className={`contribution-status status-${contribution.status}`}>
                          {contribution.status}
                        </span>
                      </div>
                      <div className="contribution-content">
                        "{contribution.content}"
                      </div>
                      <div className="contribution-stats">
                        <span className="contribution-likes">
                          ❤️ {contribution.likes} likes
                        </span>
                        <span className="contribution-date">
                          {formatDate(contribution.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No contributions yet</h3>
                  <p>Start contributing to stories and see your work here!</p>
                  <Link to="/ongoing" className="btn btn-primary">
                    Find Stories to Contribute
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
