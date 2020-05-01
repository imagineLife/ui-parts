import React from 'react';

const fileOnLoader = (e, cb) => {
  let csv = e.target.result
    let arrOfLines = csv.split(/\r\n|\n/); //csv split 
    
  let resArr = [];

  //loop through lines
  for (let lineIndex=0; lineIndex<arrOfLines.length; lineIndex++) {
    let thisLine = arrOfLines[lineIndex]
    let splitByCommas = thisLine.split(',')
    resArr.push(splitByCommas)
  }
  console.log('resArr')
  console.log(resArr)
  
  cb(resArr)
}

const fileOnError = (e) => {
  console.log('E');
  console.log(e);
}

const prepHeaders = arr => {
  return arr.map((str, idx) => (
    {
      Header: str,
      accessor: `col${idx}`
    }
  ))
}

const prepRows = arr => {
  return arr.filter((itm,idx) => idx !== 0).map((row, rowIdx) => {
    const thisRowObj = {};
    row.forEach((cellVal,cellIdx) => {
      thisRowObj[`col${cellIdx}`] = cellVal
    })
    return thisRowObj
  })
}

export {
  fileOnLoader,
  fileOnError,
  prepHeaders,
  prepRows
}