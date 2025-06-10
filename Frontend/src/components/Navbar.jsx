import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, showContributors, toggleContributors, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  // Don't show back button on home page
  const showBackButton = location.pathname !== '/';

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-left">
            {showBackButton && (
              <button 
                onClick={handleBack}
                className="back-button-navbar"
                title="Go back"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
            )}
            <Link to="/" className="navbar-brand">
              <span className="gradient-text">StoryHub</span>
            </Link>
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search stories, users, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>

          <div className="navbar-actions">
            {user && (
              <>
                <button
                  onClick={toggleContributors}
                  className={`contributor-toggle ${showContributors ? 'active' : ''}`}
                  title={showContributors ? 'Hide Contributors' : 'Show Contributors'}
                >
                  👥
                </button>

                <Link to="/create" className="btn btn-primary">
                  + Create Story
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {user ? (
              <div className="user-menu">
                <img
                  src={user?.avatar}
                  alt={user?.username}
                  className="user-avatar"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                />
                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                      My Profile
                    </Link>
                    <Link to="/ongoing" onClick={() => setShowUserMenu(false)}>
                      Ongoing Stories
                    </Link>
                    <Link to="/completed" onClick={() => setShowUserMenu(false)}>
                      Completed Stories
                    </Link>
                    <button onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-secondary">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
