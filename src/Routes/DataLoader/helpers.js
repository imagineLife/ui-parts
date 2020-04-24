import React from 'react';

const fileOnLoader = (e, cb) => {
	let csv = e.target.result
		let allTextLines = csv.split(/\r/); //csv split /\r\n|\n/
  let resArr = [];

  for (let lineIndex=0; lineIndex<allTextLines.length; lineIndex++) {
   	
    let dataSplitBySemicolon = allTextLines[lineIndex].split(';');

    for (let j=0; j<dataSplitBySemicolon.length; j++) {
        let thisLineCells = dataSplitBySemicolon[j].split(/\t/)
        resArr.push(thisLineCells)
    }
  }
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