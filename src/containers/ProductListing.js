import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setProductFavourites } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import Pagination from "./Pagination";

const ProductPage = () => {
  const productMeta = useSelector((state) => state.allProducts.productMeta);
  const paginationInfo = useSelector((state) => ({
    currentPage: state.allProducts.currentPage,
    totalPages: state.allProducts.totalPages,
    pageLimit: state.allProducts.pageLimit,
  }));
  const productFavourites = useSelector(state => state.allProducts.productFavourites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    document.getElementById('search-bar').style.display = 'inline';
    const savedFavourites = JSON.parse(localStorage.getItem("productFavourites")) || [];
    setProductFavourites(savedFavourites);
    const loadFavourites = async () => {
      const savedFavourites = await JSON.parse(localStorage.getItem("productFavourites"));
      dispatch(setProductFavourites(savedFavourites));
    }
    loadFavourites();
  }, [dispatch]);
  
  return (
    <div>
      <div className="ui grid container">
        <ProductComponent />
      </div>
      <div className="pagination">
        <Pagination/>
      </div>
    </div>

  );
};

export default ProductPage;
