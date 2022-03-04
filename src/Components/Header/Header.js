import React, { useState, useRef, useEffect } from 'react';
// import classNames from 'classnames';
import { Link } from 'react-router-dom';
// import Logo from './partials/Logo';/*  */

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {

  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });  

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }  

  // const classes = classNames(
  //   'site-header',
  //   bottomOuterDivider && 'has-bottom-divider',
  //   className
  // );

  return (
    <header
      {...props}
      // className={classes}
    >
      <div className="container">
      {/* 
        className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}
       */}
        <div>
          {/* <Logo /> */}
          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              {/* className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )} */}
              <nav ref={nav}>
                <div className="header-nav-inner">
                {/* className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )} */}
                  <ul>
                    <li>
                      <Link to="#0" onClick={closeMenu}>Documentation</Link>
                    </li>
                  </ul>
                  {!hideSignin &&
                    <ul
                      className="list-reset header-nav-right"
                    >
                      <li>
                        <Link to="#0" className="button button-primary button-wide-mobile button-sm" onClick={closeMenu}>Sign up</Link>
                      </li>
                    </ul>}
                </div>
              </nav>
            </>}
        </div>
      </div>
    </header>
  );
}

export default Header;
