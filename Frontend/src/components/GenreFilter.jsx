import React from 'react';
import './GenreFilter.css';

const GenreFilter = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <div className="genre-filter">
      <div className="genre-buttons">
        <button
          className={`genre-btn ${selectedGenre === 'All' ? 'active' : ''}`}
          onClick={() => onGenreChange('All')}
        >
          All
        </button>
        {genres.map(genre => (
          <button
            key={genre}
            className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => onGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
