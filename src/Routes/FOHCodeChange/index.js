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
const FETCH_DELAY = 300


export default function FOHCodeChanged(){

  // store data in ref
  const [boxOneState, setBoxOneState] = useState({show: false, fetching: false, data: useRef()})
  const [boxTwoState, setBoxTwoState] = useState({show: false, fetching: false, data: useRef()})
  
  /*
    when 'fetching' && no ref data
    Check for data in ref
    when data is present
      turn-off the 'fetching' state
  */

  useInterval(() => {
    console.log('Box 1 Running Tick')
    if(boxOneState.data.current && boxOneState.fetching){
      console.log('%c IS DATA, turn-off fetching flag', 'background-color: steelblue; color: white;')
      setBoxOneState(cur => ({...cur, fetching: false}))
    }
  }, boxOneState.data.current === undefined ? INTERVAL_TIME : null, boxOneState.fetching && boxOneState.show);

  
  const fetchForRefOnHover = (isFetching, curData, setRefDataCallback, cb) => {
    if(!isFetching && !curData){
      console.log('fetching on hover')
      mockFetch(setRefDataCallback, FETCH_DELAY)
      cb()
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
        onMouseOver={() => fetchForRefOnHover(
          boxOneState.fetching, 
          boxOneState.data.current, 
          (d) => boxOneState.data.current = d, 
          () => setBoxOneState(cur => ({...cur, fetching: true}))
        )} 
        value="Hover here to fetch"
        onClick={() => {
          if(!boxOneState.show) setBoxOneState(cur => ({...cur, show: true}))
        }}/>
      {
        boxOneState.show && (
          <Suspense fallback={<p></p>}>
            <ConditionalChild data={boxOneState.data.current} fetching={boxOneState.fetching}/>
          </Suspense>
        )
      }
      {/* <input 
        type="button"
        style={{border : '1px solid rgb(125,125,125)'}} 
        id="fetch-hover-two" 
        onMouseOver={() => fetchForRefOnHover(
          boxTwoState.fetching, 
          boxTwoState.data.current, 
          (d) => boxTwoState.data.current = d, 
          () => setBoxTwoState(cur => ({...cur, fetching: true}))
        )} 
        value="Hover here to fetch box two"
        onClick={() => {
          if(!boxTwoState.show) setBoxTwoState(cur => ({...cur, show: true}))
        }}/> */}
      {/* {
        boxTwoState.show && (
          <Suspense fallback={<p></p>}>
            <ConditionalChild data={boxTwoState.data.current} fetching={boxTwoState.fetching}/>
          </Suspense>
        )
      } */}
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