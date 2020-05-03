const fs = require('fs')
const rl = require('readline')

const jsonParseFile = (fileStr) => {
	return new Promise((resolve,reject) => {
		var lineReader = rl.createInterface({
		  input: fs.createReadStream(fileStr)
		});

		lineReader.on('line', function (line) {
				console.log('line')
				console.log(line)
				let csvArr = line.split(/\r\n|\n/);
				console.log('csvArr')
				console.log(csvArr)
				
		});

		lineReader.on('close', () => {
			console.log('CLOSED');	
			resolve(resData)
		});
	})
}

const lessMatchingCols = (data, str, caseSensitive) => {
	let resArr = []
}

const filterColumnsByString = (nestedArr, str) => {
	
	//store array of arrays
	let resArr = []
	
	let columnIndexesToSkip = []
	nestedArr.forEach((dataRow, idx) => {
		//store filtered-row data
		let thisRowArr = []
		
		//looping through header
		if(idx === 0){
			dataRow.forEach((rowCell,cellIdx) => {
				
				//check if header-cell matches passed string
				let thisCellIsOk = !rowCell.includes(str)

				if(thisCellIsOk){
					thisRowArr.push(rowCell)
				}else{
					columnIndexesToSkip.push(cellIdx)
				}
			})

		// looping through data rows, NOT header
		}else{
			dataRow.forEach((rowCell,cellIdx) => {
				//assure this cell index is not cell to be skipped
				if(!columnIndexesToSkip.includes(cellIdx)){
					thisRowArr.push(rowCell)
				}
			})
		}

		//store row array in parent array
		resArr.push(thisRowArr)
	})
	
	return resArr
}

const makeIntoCSV = (nestedArr) => {
	let resStr = ''
	let columns = 0
	let rows = 0
	nestedArr.forEach((row, rowIdx) => {
		let thisRowStr = ''
		row.forEach((rowCell, cellIdx) => {
			if(rowIdx === 0){
				columns = columns + 1;
			}

			let rowAndThisCell = thisRowStr + rowCell
			if(cellIdx !== row.length - 1){
				thisRowStr =  rowAndThisCell.trim() + ','
			}else{
				thisRowStr = rowAndThisCell.trim() + '\n'
			}
		})
		rows = rows + 1;
		resStr = resStr += thisRowStr
	})
	return resStr
}

jsonParseFile('./../../src/mockData/justHeaderRow.csv')