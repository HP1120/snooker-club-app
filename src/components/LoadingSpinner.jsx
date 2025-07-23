import React from 'react';
import { CircularProgress } from '@mui/material';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loading-spinner fullscreen">
        <CircularProgress
          size={48}
          sx={{
            color: 'var(--accent-primary)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="loading-spinner">
      <CircularProgress
        size={24}
        sx={{
          color: 'var(--accent-primary)',
        }}
      />
    </div>
  );
};

export default LoadingSpinner; 