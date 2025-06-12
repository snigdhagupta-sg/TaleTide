import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import './Login.css';
import { jwtDecode } from 'jwt-decode';
 // for extracting user_id from token

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername: email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token); // Save JWT containing user_id

      // Optionally decode and use the user_id
      const decoded = jwtDecode(data.token);
      console.log('Logged in user_id:', decoded.user_id);

      navigate('/profile');
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your StoryHub account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <Label htmlFor="email">Email or Username</Label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email or username"
              required
            />
          </div>

          <div className="form-group">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
