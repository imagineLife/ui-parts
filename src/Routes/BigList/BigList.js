import React, { useRef, useState, useEffect } from 'react';
import Row from './Row';
import loadMoreItems from './loadMoreItems';

/*
  React-Window:     DOCS --> https://react-window.vercel.app/#/api/FixedSizeList
  Infinite-Loader:  DOCS https://github.com/bvaughn/react-window-infinite-loader
*/ 
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

// data
import mockData from './mock-data.json';

function isItemLoaded(index,lookupObj){
  return !!lookupObj[index]
}

const BigList = () => {
  let itemStatusMap = useRef({});
  const [data,setData] = useState(null)

  // fetch data onLoad
  useEffect(() => {
    //simulate delay
    setTimeout(() => {
      setData(mockData)
    }, 1000)
  },[])
  console.log('BIG LIST')
  
  return(<main id="big-list">

    {/* loading state */}
    {!data && <span>loading...</span>}

    {
      data && 
      <InfiniteLoader
        isItemLoaded={(idx) => isItemLoaded(idx, itemStatusMap.current)}
        itemCount={data.length}
        loadMoreItems={(start,stop) => loadMoreItems(start,stop,itemStatusMap.current)}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            className="List"
            height={350}
            itemCount={data.length}
            itemSize={50}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={500}
          >
            {({ index, style }) => (
              <Row 
                index={index} 
                style={style} 
                itemStatusMap={itemStatusMap.current} 
                items={data}
              />
            )}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    }
  </main>)
}

export default BigList;