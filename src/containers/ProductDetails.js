import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCollectionDetail,
  removeSelectedProduct,
} from "../redux/actions/productsActions";
const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.allProducts.productDetail);
  const products = useSelector((state) => (state.allProducts.products));
  const { id, title, image_id, artist_title, place_of_origin, medium_display, artwork_type_title, department_title} = product;
  const dispatch = useDispatch();
  let image_source = 'https://www.artic.edu/iiif/2/'+image_id+'/full/843,/0/default.jpg'
  if(image_source == 'https://www.artic.edu/iiif/2/null/full/843,/0/default.jpg') { 
    image_source = '../images/icons/not-available.jpg'
  }

  useEffect(() => {
    if (productId && productId !== "")  
    dispatch(fetchCollectionDetail(productId));
    document.getElementById('search-bar').style.display = 'none';
    document.getElementById('submit-search').style.display = 'none';
    return () => {
      dispatch(removeSelectedProduct());
    };

  }, [productId]);

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="product-detail-page">
          <div className="product-image">
            <img src={image_source} alt={title} />
          </div>
          <div className="product-info">
          <div className="header">{title}</div>
            <div className="details">
              <div>
              <span className="detail_title">Artist: </span><span className="artist_title">{artist_title}</span>
              </div>
              <div>
                <span className="detail_title">Style:</span> <span> {artwork_type_title} ({medium_display})</span>
              </div>
              <div>
              <span className="detail_title">Department:</span> <span>{department_title}</span>
              </div>
              <div>
                <span className="detail_title">Place of Origin:</span><span> {place_of_origin}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
