import { ActionTypes } from "../constants/action-types";
const initialState = {
  products: [],
  productDetail: [],
  productFavourites: [],
  favouriteDetail: [],
  currentPage: 1,
  currentSearchQuery: "",
  totalPages: 1,
  pageLimit: 25,
  favouritesCurrentPage: 1,
  favouritesPageLimit: 25
};

//My Setters for Products/Art -> Using Product as neutrul naming 
export const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_PRODUCTS:
      return { ...state, products: payload };
      case ActionTypes.RECEIVE_ARTWORK_PAGE:
        return { ...state, totalPages: payload.pagination.total_pages, currentPage: payload.pagination.current_page };
      case ActionTypes.SET_PAGE_LIMIT:
        return { ...state, pageLimit: payload };
      case ActionTypes.SET_PRODUCTS:
        return { ...state, products: payload };
      case ActionTypes.SEARCH_ARTWORK:
        return { ...state, products: payload};
      case ActionTypes.SET_REMOVE_TOGGLE:
        let newFavourites = (state.productFavourites) ? [...state.productFavourites] : [{}];
        if(newFavourites.length === 0) { 
          newFavourites.push(payload);
        } else { 
          let index = newFavourites.findIndex(item => item.id === payload.id);
          if (index !== -1) {
              newFavourites.splice(index, 1);
          } else {
              newFavourites.push(payload);
          }
        }
        if(localStorage.getItem("productFavourites")) { 
          localStorage.removeItem("productFavourites")
        }
        localStorage.setItem("productFavourites", JSON.stringify(newFavourites));
        return { ...state, productFavourites: newFavourites };
      case ActionTypes.SET_PRODUCT_FAVOURITES:
        return { ...state, productFavourites: payload};
      case ActionTypes.SET_FAVOURITE_DETAILS:
        return { ...state, favouriteDetail: payload};
      case ActionTypes.FETCH_DETAILS:
        return { ...state, productDetail: payload};
      case ActionTypes.SET_SEARCH_QUERY:
        return { ...state, currentSearchQuery: payload };
      case ActionTypes.SET_FAVOURITES_PAGE:
        return { ...state, favouritesCurrentPage: payload };
      case ActionTypes.SET_FAVOURITES_PAGE_LIMIT:
        return { ...state, favouritesPageLimit: payload, favouritesCurrentPage: 1 };
    default:
      return state;
  }
};
