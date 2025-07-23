import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, we couldn't find the page you're looking for.</p>
        
        <div className="not-found-actions">
          <Link to="/" className="not-found-button primary">
            <Home size={20} />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="not-found-button secondary"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 