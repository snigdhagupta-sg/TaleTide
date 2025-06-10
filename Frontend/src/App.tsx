
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import StoryDetail from './pages/StoryDetail.jsx';
import OngoingStories from './pages/OngoingStories.jsx';
import CompletedStories from './pages/CompletedStories';
import SearchResults from './pages/SearchResults.jsx';
import CreateStory from './pages/CreateStory.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Auth0Provider
    domain="taletides.jp.auth0.com"
    clientId="feNLtSCHlraIGUphsk7TQPGWS37dBgqy"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >

        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/story/:id" element={<StoryDetail />} />
              <Route path="/ongoing" element={<OngoingStories />} />
              <Route path="/completed" element={<CompletedStories />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/create" element={<CreateStory />} />
              <Route path="/user/:username" element={<UserProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
  </Auth0Provider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;