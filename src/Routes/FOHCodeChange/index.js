/*
  Fetch-On-Hover Example
  - PARTS

    - parent component
      holds state
      knows when to show conditional component
      knows when data is fetching
  
    - Conditional child
      renders after clicking the btn
  
    - data in a ref
      does not re-render when data gets to the dom

    - js interval timer


    TYPICAL ORDER ON-CLICK
    - onClick
      - fetch data
      - show 'loading' state
      - add data to state
      - show data


    FETCH-ON-HOVER ORDER 
    - onHover
      - start fetching data
        - start a timer, checking if data has loaded
          - on data-loaded, turn-off the timer
    - onClick
      - show conditional new element
        - if data, show data
        - if no data, show 'loading' state

*/ 
import React, { useRef, useEffect, useState, Suspense, lazy } from 'react'
import useInterval from './useInterval';
import mockFetch from './mockFetch';
const ConditionalChild = lazy(() => import('./ConditionalChild'))
const INTERVAL_TIME = 50
const FETCH_DELAY = 1000

export default function FOHCodeChanged(){

  // store data in ref
  const data = useRef();
  const [showConditionalComponent, setShowConditionalComponent] = useState(false)
  const [fetching, setFetching] = useState(false)
  
  /*
    when 'fetching' && no ref data
    Check for data in ref
    when data is present
      turn-off the 'fetching' state
  */
  useInterval(() => {
    console.log('running tick in useInterval')
    if(data.current && fetching){
      console.log('%c IS DATA, turn-off fetching flag', 'background-color: steelblue; color: white;')
      setFetching(false)
    }
  }, data.current === undefined ? INTERVAL_TIME : null, fetching && showConditionalComponent);

  const fetchOnHover = () => {
    if(!fetching && !data.current){
      console.log('fetching on hover')
      mockFetch((d) => data.current = d, FETCH_DELAY)
      setFetching(true)
    }
  }
  
  console.log('%c Running the Parent', 'background-color: orange; color: black;')
  
  return(
    <section id="fetch-on-hover">
      <h1>Fetch On Hover</h1>
      <input 
        type="button"
        style={{border : '1px solid rgb(125,125,125)'}} 
        id="fetch-hover" 
        onMouseOver={fetchOnHover} 
        value="Hover here to fetch"
        onClick={() => {
          if(!showConditionalComponent) setShowConditionalComponent(true)
        }}/>
      {
        showConditionalComponent && (
          <Suspense fallback={<p></p>}>
            <ConditionalChild data={data.current} fetching={fetching}/>
          </Suspense>
        )
      }
    </section>
  )
}


/*
  <section id="fetch-on-click">
      <h1>Fetch On Click</h1>
      <input 
        type="button"
        style={{border : '1px solid rgb(125,125,125)'}} 
        id="fetch-hover" 
        value="Hover here to fetch"
        onClick={() => {
          if(!showConditionalComponent) setShowConditionalComponent(true)
        }}/>
      {
        showConditionalComponent && (
          <Suspense fallback={<p></p>}>
            <ConditionalChild data={data.current}/>
          </Suspense>
        )
      }
    </section>
*/ 