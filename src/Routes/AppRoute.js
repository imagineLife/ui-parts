import React, { useRef, useEffect } from 'react';
import { Route } from 'react-router-dom';
import './../Components/assets/scss/style.scss'
import ScrollReveal from './../utils/ScrollReveal';

/*
  Returns 
  - a Route with a render prop
    - render prop returns
      - Layout (calcd from prop)
      - anonymous child component

  takes 2 props
  layout: which layout to use
  component - the content of the "layout"
*/
const AppRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  const childRef = useRef();

  useEffect(() => {
    document.body.classList.add('is-loaded')
    childRef.current.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if(!Layout)
  Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Route
          {...rest}
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )} />
      )} 
    />
  );
}

export default AppRoute;