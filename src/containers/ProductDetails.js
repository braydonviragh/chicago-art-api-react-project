import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCollectionDetail,
  removeSelectedProduct,
} from "../redux/actions/productsActions";
import SingularSkeletonLoader from "./SingularSkeletonLoader";

const ProductDetails = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  let product = useSelector((state) => state.allProducts.productDetail);
  const { title, image_id, artist_title, place_of_origin, medium_display, artwork_type_title, department_title, date_display, dimensions } = product;
  const dispatch = useDispatch();
  let image_source = 'https://www.artic.edu/iiif/2/'+image_id+'/full/843,/0/default.jpg'
  if(image_source === 'https://www.artic.edu/iiif/2/null/full/843,/0/default.jpg') { 
    image_source = '../images/icons/not-available.jpg'
  }

  useEffect(() => {
    if (productId && productId !== "") {
      setIsLoading(true);
      dispatch(fetchCollectionDetail(productId)).then(() => {
        setIsLoading(false);
      });
    }
    document.getElementById('search-bar').style.display = 'none';
    document.getElementById('submit-search').style.display = 'none';
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId, dispatch]);

  if (isLoading) {
    return <SingularSkeletonLoader />;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-image-container">
          <img src={image_source} alt={title} className="product-image" />
        </div>
        <div className="product-info">
          <h1 className="product-title">{title}</h1>
          <div className="product-meta">
            <p className="artist"><span>Artist:</span> {artist_title}</p>
            <p className="date"><span>Date:</span> {date_display}</p>
            <p className="origin"><span>Origin:</span> {place_of_origin}</p>
            <p className="medium"><span>Medium:</span> {medium_display}</p>
            <p className="dimensions"><span>Dimensions:</span> {dimensions}</p>
            <p className="type"><span>Type:</span> {artwork_type_title}</p>
            <p className="department"><span>Department:</span> {department_title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
