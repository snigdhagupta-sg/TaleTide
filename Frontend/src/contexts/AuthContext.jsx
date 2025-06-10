import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    username: 'storyteller_jane',
    email: 'jane@storyhub.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-01-15',
    storiesPublished: 12,
    storiesContributed: 45,
    totalContributions: 128
  });

  const [showContributors, setShowContributors] = useState(true);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleContributors = () => {
    setShowContributors(!showContributors);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      showContributors, 
      toggleContributors 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
