import React from 'react';

function Row({ index, style, itemStatusMap, items, ...rest}) {
  let label = "Loading...";
  
  if (itemStatusMap[index] === 1) {
    label = <div className="list-item" onClick={() => {
      console.log(items[index])
    }}>
      <span>{index}.</span>
      <span>{items[index].Title}</span>
    </div>;
  }
  return (
    <div className="ListItem" style={style}>
      {label}
    </div>
  );
}
export default Row;