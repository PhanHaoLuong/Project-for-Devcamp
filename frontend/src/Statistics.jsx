import React from 'react';
import './assets/css/statistics.css';

const Statistics = ({ iconClass, label, value }) => {
  return (
    <div className="statistics">
      <div className={`statistics-icon ${iconClass}`}></div>
      <p>{label}</p>
      <h4>{value}</h4>
    </div>
  );
};

export default Statistics;
