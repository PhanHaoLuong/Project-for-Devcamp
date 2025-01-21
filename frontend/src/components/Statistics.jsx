import '../styles/statistics.css';

const Statistics = ({ iconClass, label, value }) => {
  return (
    <div className="stat">
      <i className={`statistics-icon ${iconClass}`}></i>
      <div>
        <p>{label}</p>
        <h4>{value}</h4>
      </div>
    </div>
  );
};


export default Statistics;
