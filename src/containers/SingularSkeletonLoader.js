import React from 'react';

const ProductDetailsSkeleton = () => {
  return (
    <div className="product-detail-container skeleton">
      <div className="product-detail-content">
        <div className="product-image-container">
          <div className="product-image skeleton-box"></div>
        </div>
        <div className="product-info">
          <div className="product-title skeleton-box"></div>
          <div className="product-meta">
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
