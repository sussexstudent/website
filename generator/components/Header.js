import React from 'react';
import Social from './Social';
import AnodyneMenu from './AnodyneMenu';
import Logo from './LogoInclude';

// have a gander at logoChange.js - manually running it through Uglify2 because a pipeline to build is far to complex
const logoChangeJS = `!function(){var e;try{var e,t=localStorage.getItem("su_cc");null===t?e=0:(e=parseInt(t,10),(e>8||0>e)&&(e=0)),localStorage.setItem("su_cc",e+1)}catch(c){e=0}var a=["ee534f","1db8a4","27428c"];document.querySelector(".HeaderLogo__svg-group").style.fill="#"+a[[2,1,2,0,1,0,2,1,0][e]]}();`;

const Header = () => (
  <header className="Header">
    <div className="Container">
      <div className="Header__top">
        <div className="Header__logo HeaderLogo">
          <a className="HeaderLogo__link" href="/">
            <Logo />
          </a>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: logoChangeJS }}
          />
        </div>

        <div className="Header__search">
          <input
            className="HeaderSearch HeaderSearch--search-icon"
            type="search"
            placeholder="Search"
          />
        </div>
        <div className="Header__social">
          <Social />
        </div>
      </div>
      <AnodyneMenu />
    </div>
  </header>
);

export default Header;
