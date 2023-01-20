import { ActionTypes } from "../constants/action-types";
import artAPI from "../../api/artAPI";

//Actions / Getters
export const fetchProducts = (page = 1, limit = 25) => async (dispatch) => { 
    const response = await artAPI.get(`/artworks?page=${page}&limit=${limit}&&fields=id,title,image_id,artist_title
    `);

    dispatch({type:ActionTypes.FETCH_PRODUCTS, payload: response.data.data})
    dispatch({type:ActionTypes.RECEIVE_ARTWORK_PAGE, payload: response.data})
}

export const setPageLimit = (pageLimit) => {
  return {
    type: ActionTypes.SET_PAGE_LIMIT,
    payload: pageLimit,
  };
};

export const searchArtwork = (query, page = 1, limit = 25) => async (dispatch) => {
  const response = await artAPI.get(`/artworks/search?q=${query}&page=${page}&limit=${limit}&&fields=id,title,image_id,artist_title`);
  dispatch({type: ActionTypes.SEARCH_ARTWORK, payload: response.data.data});
  dispatch({type:ActionTypes.RECEIVE_ARTWORK_PAGE, payload: response.data})

}

export const fetchCollectionDetail = (artId) => async (dispatch) => { 
  const response = await artAPI.get(`/artworks/${artId}`);

  dispatch({type:ActionTypes.FETCH_DETAILS, payload: response.data.data})
}

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const setProductFavourites = (favourites) => {
    return { 
      type: ActionTypes.SET_PRODUCT_FAVOURITES,
      payload: favourites,
    };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const favouriteToggle = (selectedProduct) => {
  return {
    type: ActionTypes.SET_REMOVE_TOGGLE,
    payload: selectedProduct,
  };
}
