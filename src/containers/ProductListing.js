import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setProductFavourites, setPageLimit } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import Pagination from "./Pagination";
import SkeletonLoader from "./SkeletonLoader";

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { currentPage, totalPages, pageLimit } = useSelector((state) => state.allProducts);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await dispatch(fetchProducts(currentPage, pageLimit));
      document.getElementById('search-bar').style.display = 'inline';
      const loadFavourites = async () => {
        const savedFavourites = JSON.parse(localStorage.getItem("productFavourites")) || [];
        dispatch(setProductFavourites(savedFavourites));
      }
      await loadFavourites();
      setIsLoading(false);
    };
    loadData();
  }, [dispatch, currentPage, pageLimit]);
  
  const handlePageChange = (newPage) => {
    dispatch(fetchProducts(newPage, pageLimit));
  };

  const handlePageLimitChange = (newLimit) => {
    dispatch(setPageLimit(newLimit));
    dispatch(fetchProducts(1, newLimit));
  };

  return (
    <div>
      <div className="ui grid container">
      <h1 className="page-header">Artworks</h1>
        {isLoading ? <SkeletonLoader /> : <ProductComponent />}
      </div>
      <div className="pagination">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageLimit={pageLimit}
          onPageChange={(page, limit) => {
            dispatch(fetchProducts(page, limit));
          }}
          onPageLimitChange={(limit) => {
            dispatch(setPageLimit(limit));
            dispatch(fetchProducts(1, limit));
          }}
        />
      </div>
    </div>
  );
};

export default ProductPage;
