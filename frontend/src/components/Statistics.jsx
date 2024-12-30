import React from 'react';
import '../assets/css/statistics.css';

const Statistics = ({ iconClass, label, value, color }) => {
  return (
    <div className={`stat ${color}`}>
      <i className={`statistics-icon ${iconClass}`}></i>
      <div>
        <p>{label}</p>
        <h4>{value}</h4>
      </div>
    </div>
  );
};


export default Statistics;
