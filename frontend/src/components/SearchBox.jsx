import '../styles/SearchBox.css';

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-box">
        <li className="search-container">
            <i className="ti-search"></i>
            <input
                type="text"
                placeholder="Search"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
            />
        </li>
        <ul className='search-result'></ul>
    </div>
  );
}

export default SearchBox;