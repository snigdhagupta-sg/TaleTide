import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import './SignUp.css';
5000
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone:''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Signup failed');
      setLoading(false);
      return;
    }

    const userData = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      joinDate: new Date().toISOString().split('T')[0],
      storiesPublished: 0,
      storiesContributed: 0,
      totalContributions: 0
    };

    login(userData);
    setLoading(false);
    navigate('/');
  } catch (error) {
    console.error('Signup error:', error);
    alert('Something went wrong. Please try again.');
    setLoading(false);
  }
};

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Join StoryHub</h1>
          <p>Create your account and start telling stories</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="form-group">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="signup-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;