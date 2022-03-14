import React from 'react';
import Header from './../HeaderOld';
import Footer from './../Footer';

const LayoutDefault = ({ children, className }) => (
  <main className={className}>
    <Header navPosition="right" className="reveal-from-bottom" />
    <main className="site-content">
      {children}
    </main>
    <Footer />
  </main>
);

export default LayoutDefault;  