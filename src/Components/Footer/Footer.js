import React from 'react';
// import classNames from 'classnames';
// import Logo from './partials/Logo';
// import FooterNav from './../FooterNav';
// import FooterSocial from './../FooterSocial';

const Footer = ({
  className,
  topOuterDivider,
  topDivider,
  ...props
}) => {

  // const classes = classNames(
  //   'site-footer center-content-mobile',
  //   topOuterDivider && 'has-top-divider',
  //   className
  // );

  return (
    <footer
      {...props}
      // className={classes}
    >
      <div className="container">
      {/* className={
          classNames(
            'site-footer-inner',
            topDivider && 'has-top-divider'
          )} */}
        <div>
          <div className="footer-top space-between text-xxs">
            {/* <Logo />
            <FooterSocial /> */}
          </div>
          <div className="footer-bottom space-between text-xxs invert-order-desktop">
            {/* <FooterNav /> */}
            <div className="footer-copyright">Made by <a href="https://cruip.com">Cruip</a>. All right reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;