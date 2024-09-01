import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Twirl as Hamburger } from 'hamburger-react'

const Header = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <Link to="/">
          <h2 className="header-title">Art Institute of Chicago Gallery</h2>
        </Link>
        <a target="_blank" rel="noopener noreferrer" className="profile-link" href="https://braydonviragh.com">By Braydon Viragh</a>
        <div className="favourites-div">
          <Link to="/favourites" className="favourites-link">
            <img src="../images/icons/heart.png" alt="Favorites icon"/>
            Favourites
          </Link>
        </div>
        <div>
          <div className="hamburger-icon">
            <Hamburger onToggle={setOpen} />
          </div>
          <div className={`hamburger-menu ${isOpen ? 'open' : 'closed'}`}>
            <Link to="/" onClick={() => setOpen(false)}>Art Institute of Chicago Gallery</Link>
            <Link to="/favourites" onClick={() => setOpen(false)}><span className="favourite-nav-link">Favourites<img src="../images/icons/heart.png" alt="Favorites icon"/></span></Link>
            <br/>
            <h5>By Braydon Viragh</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
