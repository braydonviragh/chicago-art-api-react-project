import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPageLimit } from "../redux/actions/productsActions";

const Pagination = () => {
  const dispatch = useDispatch();
  const paginationInfo = useSelector((state) => ({
    currentPage: state.allProducts.currentPage,
    totalPages: state.allProducts.totalPages,
    pageLimit: state.allProducts.pageLimit,
  }));

  const { currentPage, totalPages, pageLimit } = paginationInfo;
  const handlePageChange = (page) => {
    dispatch(fetchProducts(page, pageLimit));
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageLimitChange = (e) => {
    dispatch(setPageLimit(e.target.value));
    dispatch(fetchProducts(1, e.target.value));
  };

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
