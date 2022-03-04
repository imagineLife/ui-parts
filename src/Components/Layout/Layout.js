import React from 'react';
import Header from './../Header';
import Footer from './../Footer';

function Layout({ children }){
  return(
    <>
      <Header navPosition="right" className="reveal-from-bottom" />
      <main className="site-content">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout;  