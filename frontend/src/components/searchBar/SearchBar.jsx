import './SearchBar.scss';
import { FaArrowRight } from "react-icons/fa6";
import { useState, useContext } from 'react';
import blogContext from '../../contexts/blog/blogContext';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setSearchTerm: setGlobalSearchTerm } = useContext(blogContext);

  const handleSearch = () => {
    setGlobalSearchTerm(searchTerm);
  };

  return (
    <div className='search_container'>
      <input
        className="home_search-bar"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}><FaArrowRight/></button>
    </div>
  );
}

export default SearchBar;
