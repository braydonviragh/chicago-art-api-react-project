import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-meta"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
