import React from 'react';
import '../assets/css/statistics.css';

const Statistics = ({ iconClass, label, value }) => {
  return (
    <div className="stat">
      <div className={`statistics-icon ${iconClass}`}></div>
      <div>
        <p>{label}</p>
        <h4>{value}</h4>
      </div>
    </div>
  );
};


export default Statistics;
