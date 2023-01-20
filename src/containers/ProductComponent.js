import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { favouriteToggle } from "../redux/actions/productsActions";
import { useEffect, useState } from "react";

const ProductComponent = ({ favourites = false }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    if (favourites) {
      return (state.allProducts.productFavourites && state.allProducts.productFavourites.length) ? state.allProducts.productFavourites : []
    }
    return (state.allProducts.products && state.allProducts.products.length) ? state.allProducts.products : [];
  });
  const productFavourites = useSelector((state) => state.allProducts.productFavourites);
  const [heartIconSources, setHeartIconSources] = useState({});

  useEffect(() => {
    const updatedHeartIconSources = (productFavourites != null) ? products.reduce((acc, product) => {
      acc[product.id] = productFavourites.find((fav) => fav.id === product.id) 
        ? "../images/icons/heart.png" 
        : "../images/icons/like.png";
      return acc;
    }, {}) : {}
    setHeartIconSources(updatedHeartIconSources);
    
  }, [productFavourites, products]);
  const renderList = products.map((product) => {
    const { id, title, image_id, artist_title } = product;
    let image_source = 'https://www.artic.edu/iiif/2/'+image_id+'/full/843,/0/default.jpg'
    if(image_source == 'https://www.artic.edu/iiif/2/null/full/843,/0/default.jpg') { 
      image_source = '../images/icons/not-available.jpg'
    }
    const heartIconSource = (heartIconSources[id]) ? heartIconSources[id] : "../images/icons/like.png";

    function toggleFavourite(art) {
      dispatch(favouriteToggle(art));
    }
    function routeToDetailsPage(art_id) {
      window.location.pathname = `/product/${art_id}`;  
    }
    //Maybe dont need these
    function handleMouseEnter(element) {
      element.target.src = "../images/icons/heart.png"
    }
  
    function handleMouseLeave(element) {
      const id = element.target.getAttribute("id");
      const isFavourite = (productFavourites) ? productFavourites.find((fav) => fav.id == id) : false
      if(!isFavourite) {
          element.target.src = "../images/icons/like.png"
      }
    }
    return (
      <div className="image_grid column" key={id}>
        <Link to={`#`}>
          <div className="ui link cards">
            <div className="card">
              <div className="image" onClick={() => routeToDetailsPage(id)}>
                <img src={image_source} alt={title} />
              </div>
              <div className="content">
                <div className="header" onClick={() => routeToDetailsPage(id)}>{title}</div>
                <div className="flex_content">
                  <div className="meta">{artist_title}</div>
                  <div onClick={() => toggleFavourite(product)} className="fav_icon">
                    <img
                    id={product.id}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    src={heartIconSource}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default ProductComponent;
