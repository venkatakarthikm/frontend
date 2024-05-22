import React from 'react';
import giphy from './giphy.gif'
import './style.css'

export default function PageNotFound() {
  return (
    <div className="not-found-container">
      <h1>Page Not Found</h1>
      <img src={giphy} alt="Page Not Found" className="not-found-image" />
    </div>
  );
}