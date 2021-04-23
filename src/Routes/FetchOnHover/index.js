import React, { useRef, useEffect, useState } from 'react'

const mockFetch = (cb) => {
  setTimeout(() => {
    cb({thisIs: "an object"})
  }, 4000)
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


export default function FetchOnHover(){

  const data = useRef();
  const [clicked, setClicked] = useState(false)

  const [delay, setDelay] = useState(1000);

  function getCurrentData(){
    return data.current
  }
  
  useInterval(() => {
    console.log('running tick in useInterval')
    console.log('data.current')
    console.log(data.current)
    
  }, getCurrentData() === undefined ? delay : null);

  const fetchOnHover = () => {
    console.log('fetch on hover')
    mockFetch((d) => data.current = d)
  }

  function checkForData(){
    console.log('checking for data in ref')
    console.log(data.current)
  }
  
  console.log('rendering fetchOnHover')
  
  return(
    <section id="fetch-on-hover">
      <h1>Fetch On Hover</h1>
      <div 
        style={{border : '1px solid rgb(125,125,125)'}} 
        id="fetch-hover" 
        onMouseOver={fetchOnHover} 
        onClick={checkForData}>
          Hover here to fetch
      </div>
      <div 
        id="show-data">
          {
            clicked && 
            data.current 
            ? JSON.stringify(data.current) 
            : 'loading...'
          }
      </div>
    </section>
  )
}