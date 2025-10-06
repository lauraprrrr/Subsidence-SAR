import React from 'react';
import ReactCompareImage from 'react-compare-image';
import './ImageComparator.css';

const ImageComparator = ({ before, after }) => {
  return (
    <div className="comparator-container">
      <ReactCompareImage leftImage={before} rightImage={after} />
    </div>
  );
};

export default ImageComparator;