import '../styles/Statistics.css';

const Statistics = ({ iconClass, label, description, value }) => {
  return (
    <div className="statContainer" title={description}>
      <div className="stat" >
        <i className={`statistics-icon ${iconClass}`}></i>
        <div>
          <p>{label}</p>
          <h4>{value}</h4>
        </div>
      </div>
    </div>
  );
};


export default Statistics;