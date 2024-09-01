import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { favouriteToggle } from "../redux/actions/productsActions";
import toast from 'react-hot-toast';

const ProductComponent = ({ favourites = false, products = null }) => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.allProducts.products);
  const productFavourites = useSelector((state) => state.allProducts.productFavourites);

  const displayProducts = products || (favourites ? productFavourites : allProducts);

  const [heartIconSources, setHeartIconSources] = useState({});

  useEffect(() => {
    const updatedHeartIconSources = displayProducts.reduce((acc, product) => {
      acc[product.id] = productFavourites.find((fav) => fav.id === product.id) 
        ? "../images/icons/heart.png" 
        : "../images/icons/like.png";
      return acc;
    }, {});
    setHeartIconSources(updatedHeartIconSources);
  }, [productFavourites, displayProducts]);

  const toggleFavourite = (product) => {
    dispatch(favouriteToggle(product));
    const isFavourite = productFavourites.some((fav) => fav.id === product.id);
    setHeartIconSources(prev => ({
      ...prev,
      [product.id]: isFavourite ? "../images/icons/like.png" : "../images/icons/heart.png"
    }));
    
    if (!isFavourite) {
      toast.success('Saved to your favourites!', {
        style: {
          border: '1px solid #4CAF50',
          padding: '16px',
          color: '#4CAF50',
        },
        iconTheme: {
          primary: '#4CAF50',
          secondary: '#FFFAEE',
        },
      });
    }
  };

  const renderList = displayProducts.map((product) => {
    const { id, title, image_id, artist_title } = product;
    let image_source = 'https://www.artic.edu/iiif/2/'+image_id+'/full/843,/0/default.jpg'
    if(image_source === 'https://www.artic.edu/iiif/2/null/full/843,/0/default.jpg') { 
      image_source = '../images/icons/not-available.jpg'
    }
    const heartIconSource = (heartIconSources[id]) ? heartIconSources[id] : "../images/icons/like.png";

    function routeToDetailsPage(art_id) {
      window.location.pathname = `/product/${art_id}`;  
    }
    return (
      <div className="image_grid column" key={id}>
        <Link to={`/product/${id}`}>
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
                      src={heartIconSource}
                      alt="Favorite icon"
                    />
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
