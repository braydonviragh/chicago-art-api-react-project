import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchArtwork } from "../redux/actions/productsActions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const pageLimit = useSelector((state) => state.allProducts.pageLimit);
  const currentPage = useSelector((state) => state.allProducts.currentPage);

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    const searchTerm = searchBar.value;

    dispatch(searchArtwork(searchTerm, 1, pageLimit));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Search API upon pressing enter
      handleSearch()
    }
  }

  return (
    <div>
    <input
      id="search-bar"
      type="text"
      placeholder="Search for artwork..."
      onKeyPress={handleKeyPress}
    />
    <button id='submit-search' className="my-button-class" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;