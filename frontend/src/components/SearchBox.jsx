import '../styles/SearchBox.css';

const SearchBox = () => {
  const handleInput = async (e) => {
    const response = await fetch(`http://localhost:3000/search?q=${e.target.value}`);
    const data = await response.json();
    const resultContainer = document.querySelector('.search-result');
    resultContainer.innerHTML = '';
    data.forEach(post => {
      const li = document.createElement('li');
      li.textContent = post.title;
      resultContainer.appendChild(li);
    });
  };

  return (
    <div className="search-box">
      <li className="search-container">
        <i className="ti-search"></i>
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onInput={handleInput}
        />
      </li>
      <ul className='search-result'></ul>
    </div>
  );
};

export default SearchBox;