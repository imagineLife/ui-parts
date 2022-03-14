import React, { useRef } from 'react';
import Row from './Row';
import loadMoreItems from './loadMoreItems';

// React-Window: DOCS --> https://react-window.vercel.app/#/api/FixedSizeList
import { FixedSizeList } from 'react-window';

// DOCS --> https://github.com/bvaughn/react-window-infinite-loader
import InfiniteLoader from 'react-window-infinite-loader';

// data
import mockData from './mock-data.json';

function isItemLoaded(index,lookupObj){
  return !!lookupObj[index]
}

const BigList = () => {
  let itemStatusMap = useRef({});
  console.log('BIG LIST')
  
  return(<main id="big-list">
    <InfiniteLoader
        isItemLoaded={(idx) => isItemLoaded(idx, itemStatusMap.current)}
        itemCount={mockData.length}
        loadMoreItems={(start,stop) => loadMoreItems(start,stop,itemStatusMap.current)}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            className="List"
            height={350}
            itemCount={mockData.length}
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
                items={mockData}
              />
            )}
          </FixedSizeList>
        )}
      </InfiniteLoader>
  </main>)
}

export default BigList;