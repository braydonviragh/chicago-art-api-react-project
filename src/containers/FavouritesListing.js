import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProductFavourites, setFavouritesPage, setFavouritesPageLimit } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import Pagination from "./Pagination";
import SkeletonLoader from "./SkeletonLoader";

const FavouritePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { currentPage, totalPages, pageLimit, productFavourites } = useSelector((state) => state.allProducts);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const loadFavourites = async () => {
        const savedFavourites = await JSON.parse(localStorage.getItem("productFavourites")) || [];
        dispatch(setProductFavourites(savedFavourites));
      }
      document.getElementById('search-bar').style.display = 'none';
      document.getElementById('submit-search').style.display = 'none';
      await loadFavourites();
      setIsLoading(false);
    };
    loadData();
  }, [dispatch]);

  const paginatedFavorites = productFavourites.slice((currentPage - 1) * pageLimit, currentPage * pageLimit);

  return (
    <div>
      <div className="ui grid container">
      <div className="page-header">
        <h1 className="page-title">Your Favourites</h1>
        <Link to="/" className="go-back-button">Go Back</Link>
      </div>
        {isLoading ? <SkeletonLoader /> : <ProductComponent favourites={true} products={paginatedFavorites} />}
      </div>
      <div className="pagination">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(productFavourites.length / pageLimit)}
          pageLimit={pageLimit}
          onPageChange={(page) => dispatch(setFavouritesPage(page))}
          onPageLimitChange={(limit) => dispatch(setFavouritesPageLimit(limit))}
        />
      </div>
    </div>
  );
};

export default FavouritePage;
