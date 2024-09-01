import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchArtwork } from "../redux/actions/productsActions";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchArtwork(searchTerm, 1));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="search-bar"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for artwork..."
      />
      <button id='submit-search' className="my-button-class" type="submit">Search</button>
    </form>
  );
};

export default SearchBar;