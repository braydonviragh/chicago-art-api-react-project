import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./containers/ProductListing";
import FavouritesListing from "./containers/FavouritesListing";
import Header from "./containers/Header";
import "./App.css";
import ProductDetails from "./containers/ProductDetails";
import SearchBar from "./containers/SearchBar";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="absoluteSearchBar">
          <SearchBar/>
        </div>
        <Switch>
          <Route path="/" exact component={ProductListing} />
          <Route path="/product/:productId" component={ProductDetails} />
          <Route path="/favourites" component={FavouritesListing} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
