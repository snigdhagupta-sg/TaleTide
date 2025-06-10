import React, { useState } from 'react';
import './ContributionForm.css';

const ContributionForm = ({ story, onClose }) => {
  const [contribution, setContribution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contribution.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Contribution submitted:', {
      storyId: story.id,
      content: contribution,
      timestamp: new Date().toISOString()
    });
    
    setIsSubmitting(false);
    onClose();
    
    // Show success message (in real app, this would be a toast notification)
    alert('Your contribution has been submitted for review!');
  };

  return (
    <div className="contribution-modal-overlay" onClick={onClose}>
      <div className="contribution-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Contribute to "{story.title}"</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="current-ending">
            <h4>Current story ending:</h4>
            <div className="ending-text">
              {story.chapters?.[story.chapters.length - 1]?.content || story.summary}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="contribution-form">
            <label htmlFor="contribution">Your contribution:</label>
            <textarea
              id="contribution"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              placeholder="Continue the story from where it left off..."
              className="contribution-textarea"
              rows={6}
              required
            />
            
            <div className="form-actions">
              <button 
                type="button" 
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting || !contribution.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContributionForm;
