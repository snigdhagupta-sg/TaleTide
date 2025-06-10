import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { genres } from '../data/dummyData';
import BackButton from '../components/BackButton';
import './CreateStory.css';

const CreateStory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    summary: '',
    firstChapter: '',
    status: 'ongoing'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Story created:', formData);
    
    // In a real app, you'd get the new story ID from the API response
    const newStoryId = Math.floor(Math.random() * 1000) + 100;
    
    setIsSubmitting(false);
    navigate(`/story/${newStoryId}`);
  };

  const isFormValid = formData.title.trim() && 
                     formData.genre && 
                     formData.summary.trim() && 
                     formData.firstChapter.trim();

  return (
    <div className="create-story">
      <div className="container">
        
        <div className="page-header">
          <h1>✍️ Create New Story</h1>
          <p>Start a collaborative storytelling journey and invite others to contribute</p>
        </div>

        <div className="create-form-container">
          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-group">
              <label htmlFor="title">Story Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter an engaging title for your story"
                className="form-input"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="genre">Genre *</label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a genre</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Initial Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="ongoing">Ongoing (Open for contributions)</option>
                  <option value="seeking">Seeking Contributors</option>
                  <option value="paused">Paused (No contributions yet)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="summary">Story Summary *</label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Write a compelling summary that will attract contributors..."
                className="form-textarea"
                rows={3}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstChapter">First Chapter *</label>
              <textarea
                id="firstChapter"
                name="firstChapter"
                value={formData.firstChapter}
                onChange={handleChange}
                placeholder="Begin your story here. This will be the foundation that others build upon..."
                className="form-textarea"
                rows={8}
                required
              />
              <div className="character-count">
                {formData.firstChapter.length} characters
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'Creating Story...' : 'Publish Story'}
              </button>
            </div>
          </form>

          <div className="creation-tips">
            <h3>💡 Tips for Great Stories</h3>
            <ul>
              <li><strong>Start with a hook:</strong> Begin with an intriguing situation or question</li>
              <li><strong>Leave room for growth:</strong> Don't resolve everything in the first chapter</li>
              <li><strong>Set the tone:</strong> Establish the mood and style for contributors to follow</li>
              <li><strong>Create compelling characters:</strong> Give contributors interesting personalities to work with</li>
              <li><strong>End with potential:</strong> Leave openings for multiple story directions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;