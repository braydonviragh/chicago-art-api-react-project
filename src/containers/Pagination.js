import React from 'react';
import { useDispatch } from 'react-redux';

const Pagination = ({ currentPage, totalPages, pageLimit, onPageChange, onPageLimitChange }) => {
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    onPageChange(page, pageLimit);
  };

  const handlePageLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    dispatch(onPageLimitChange(newLimit));
    dispatch(onPageChange(1, newLimit));
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (totalPages <= 10) {
      return pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-number ${currentPage === number ? 'active' : ''}`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ));
    } else {
      const start = currentPage - 5;
      const end = currentPage + 4;
      let pageNumbersToRender = pageNumbers.slice(start, end);
      if (start < 1) {
        pageNumbersToRender = pageNumbers.slice(0, 10);
      } else if (end > totalPages) {
        pageNumbersToRender = pageNumbers.slice(totalPages - 10, totalPages);
      }
      return (
        <>
          {currentPage > 5 && <span>...</span>}
          {pageNumbersToRender.map((number) => (
            <button
              key={number}
              className={`pagination-number ${currentPage === number ? 'active' : ''}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
            ))}
            {currentPage < totalPages - 4 && <span>...</span>}
            </>
        );
    }
    };

    return (
        <div className="pagination">
        <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        >
        Prev
        </button>
        {renderPageNumbers()}
        <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        >
        Next
        </button>
        <div className='select-bar'>
            <label htmlFor="page-limit">Results per page:</label>
            <select id="page-limit" value={pageLimit} onChange={handlePageLimitChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
        </div>

        </div>
        );
    };

    export default Pagination;
