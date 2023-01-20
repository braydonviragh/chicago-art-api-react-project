import React from "react";
import { Redirect } from 'react-router-dom';
import { Twirl as Hamburger } from 'hamburger-react'
import { useEffect, useState } from "react";

const handleClick = () => {
  window.location.href = '/';
}; 
const Header = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <h2 onClick={handleClick}>Art Institute of Chicago Gallery</h2> 
        <a target="_blank"className="profile-link"href="https:braydonviragh.com">By Braydon Viragh</a>
        <div className="favourites-div">
          <a href="/favourites"className="favourites-link">
            <img src="../images/icons/heart.png"/>
            Favourites
          </a>
        </div>
        <div>
          <div className="hamburger-icon">
            <Hamburger onToggle={toggled => {
              setOpen(toggled);
            }} />
          </div>
          <div className={`hamburger-menu ${isOpen ? 'open' : 'closed'}`}>
            <a onClick={handleClick}>Art Institute of Chicago Gallery</a>
            <a href="/favourites">Favourites</a>
            <br/>
            <h5>By Braydon Viragh</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
