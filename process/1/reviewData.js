const fs = require('fs')
const rl = require('readline')
const util = require('util')
const debug = util.debuglog('review')

//result placeholder
let groupedObj = {
	"age": {
		"<5": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
		"5-17": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
		"18-34": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
		"35-64": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
		"65+": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
	},
	"gender": {
		"percentBelowPoverty"	: [],
		"total": [],
		"belowPoverty": []
	},
	"income": {
		"percentBelowPoverty"	: [],
		"total": [],
		"belowPoverty": []
	},
	"education": {
		"percentBelowPoverty"	: [],
		"total": [],
		"belowPoverty": []
	},
	"race": {
		"percentBelowPoverty"	: [],
		"total": [],
		"belowPoverty": []
	}
}
let mappedColumnsGrouped = {
	"age": {
		"<5": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
		"5-17": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
		"18-34": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
		"35-64": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
		"65+": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
	},
	"gender": {
		"percentBelowPoverty"	: [],
		"total": [],
		"belowPoverty": []
	},
	"income": {
		"percentBelowPoverty"	: [],
		"total": [],
		"belowPoverty": []
	},
	"education": {
		"percentBelowPoverty"	: [],
		"total": [],
		"belowPoverty": []
	},
	"race": {
		"percentBelowPoverty"	: [],
		"total": [],
		"belowPoverty": []
	}
}

const jsonParseFile = (fileStr) => {
	debug('\x1b[32m%s\x1b[0m',`jsonParseHeaderFile`)
	return new Promise((resolve,reject) => {
		var lineReader = rl.createInterface({
		  input: fs.createReadStream(fileStr)
		});

		let resData = []
		lineReader.on('line', function (line) {
				let csvArr = line.split(',');
				resData = csvArr
		});

		lineReader.on('close', () => {
			debug('\x1b[32m%s\x1b[0m',`DONE parsing input`)
			resolve(resData)
		});
	})
}

const groupIntoCategories = (srcArr) => {
	debug('\x1b[32m%s\x1b[0m',`groupIntoCategories`)

	const indexArrayMapped = []
	console.log('header length')
	console.log(srcArr.length)
	
	srcArr.map((header, headerIdx) => {
		if([2,3].includes(headerIdx)){
			indexArrayMapped.push("_")
			return;
		}

		//IGNORE THESE
		if(header.match(/EMPLOYMENT STATUS/) || header.match(/WORK EXPERIENCE/)){
			// console.log('HUH?!');
			// console.log(header)
			// console.log(headerIdx)
			indexArrayMapped.push("_")
			return;
		}


		//AGE
		if(header.match(/AGE/)){
			if(header.match(/Under 5/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.<5.percentBelowPoverty`)
					mappedColumnsGrouped.age["<5"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					// console.log('AGE, UNDER 5, Total');
					// console.log('header')
					// console.log(header)
					// console.log('headerIdx')
					// console.log(headerIdx)
					
					indexArrayMapped.push(`age.<5.total`)
					mappedColumnsGrouped.age["<5"].total.push({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`age.<5.belowPoverty`)
					mappedColumnsGrouped.age["<5"].belowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}else{
					// console.log('HUH?!');
					// console.log(header)
					// console.log(headerIdx)
					indexArrayMapped.push("_")
					return;
				}
			}

			else if(header.match(/17/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.5-17.percentBelowPoverty`)
					mappedColumnsGrouped.age["5-17"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.5-17.total`)
					mappedColumnsGrouped.age["5-17"].total.push({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`age.5-17.belowPoverty`)
					mappedColumnsGrouped.age["5-17"].belowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}else{
					// console.log('HUH?!');
					// console.log(header)
					// console.log(headerIdx)
					indexArrayMapped.push("_")
					return;
				}
			}

			else if(header.match(/34/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.18-34.percentBelowPoverty`)
					mappedColumnsGrouped.age["18-34"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.18-34.total`)
					mappedColumnsGrouped.age["18-34"].total.push({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`age.18-34.belowPoverty`)
					mappedColumnsGrouped.age["18-34"].belowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}else{
					// console.log('HUH?!');
					// console.log(header)
					// console.log(headerIdx)
					indexArrayMapped.push("_")
					return;
				}
			}

			else if(header.match(/35/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.35-64.percentBelowPoverty`)
					mappedColumnsGrouped.age["35-64"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.35-64.total`)
					mappedColumnsGrouped.age["35-64"].total.push({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`age.35-64.belowPoverty`)
					mappedColumnsGrouped.age["35-64"].belowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}else{
					// console.log('HUH?!');
					// console.log(header)
					// console.log(headerIdx)
					indexArrayMapped.push("_")
					return;
				}
			}

			else if(header.match(/65/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.65+.percentBelowPoverty`)
					mappedColumnsGrouped.age["65+"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					console.log('---- AGE . 65+ . Total -----');
					console.log(header)
					indexArrayMapped.push(`age.65+.total`)
					mappedColumnsGrouped.age["65+"].total.push({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`age.65+.belowPoverty`)
					mappedColumnsGrouped.age["65+"].belowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}else{
					// console.log('HUH?!');
					// console.log(header)
					// console.log(headerIdx)
					indexArrayMapped.push("_")
					return;
				}
			}

			else{
				// if(headerIdx === 5){
					console.log('AGE MISSES');
				console.log(header)
				console.log(headerIdx)
				// }

				indexArrayMapped.push("_")
				return;
			}
		}

		//SEX
		if(header.match(/SEX/)){
			if(header.match(/Percent/)){
				indexArrayMapped.push(`gender.percentBelowPoverty`)
				mappedColumnsGrouped.gender.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				indexArrayMapped.push(`gender.total`)
				mappedColumnsGrouped.gender.total.push({"title": header, "idx": headerIdx})
			}else if(header.match(/Below poverty/)){
				indexArrayMapped.push(`gender.belowPoverty`)
				mappedColumnsGrouped.gender.belowPoverty.push({"title": header, "idx": headerIdx})
			}else{
				console.log('HUH?!');
				console.log(header)
				console.log(headerIdx)
				indexArrayMapped.push("_")
				console.log('// - - - - - //')	
			}
			return;
		}

		//EDUCATION
		if(header.match(/EDUCATION/)){
			if(header.match(/Percent/)){
				indexArrayMapped.push(`education.percentBelowPoverty`)
				mappedColumnsGrouped.education.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				indexArrayMapped.push(`education.total`)
				mappedColumnsGrouped.education.total.push({"title": header, "idx": headerIdx})
			}else if(header.match(/Below poverty/)){
				indexArrayMapped.push(`education.belowPoverty`)
				mappedColumnsGrouped.education.belowPoverty.push({"title": header, "idx": headerIdx})
			}else{
				// console.log('HUH?!');
				// console.log(header)
				// console.log(headerIdx)
				indexArrayMapped.push("_")
				// console.log('// - - - - - //')	
			}
			return;
		}

		//INCOME
		if(header.match(/INCOME/)){
			if(header.match(/Percent/)){
				indexArrayMapped.push(`income.percentBelowPoverty`)
				mappedColumnsGrouped.income.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				indexArrayMapped.push(`income.total`)
				mappedColumnsGrouped.income.total.push({"title": header, "idx": headerIdx})
			}else if(header.match(/Below poverty/)){
				indexArrayMapped.push(`income.belowPoverty`)
				mappedColumnsGrouped.income.belowPoverty.push({"title": header, "idx": headerIdx})
			}else{
				console.log('HUH?!');
				console.log(header)
				console.log(headerIdx)
				indexArrayMapped.push("_")
				console.log('// - - - - - //')	
			}
			return;
		}

		//race
		if(header.match(/RACE/)){
			if(header.match(/Percent/)){
				indexArrayMapped.push(`race.percentBelowPoverty`)
				mappedColumnsGrouped.race.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				indexArrayMapped.push(`race.total`)
				mappedColumnsGrouped.race.total.push({"title": header, "idx": headerIdx})
			}else if(header.match(/Below poverty/)){
				indexArrayMapped.push(`race.belowPoverty`)
				mappedColumnsGrouped.race.belowPoverty.push({"title": header, "idx": headerIdx})
			}else{
				console.log('HUH?!');
				console.log(header)
				console.log(headerIdx)
				indexArrayMapped.push("_")
				console.log('// - - - - - //')	
			}
			return;
		}

		else{
			// console.log('HUH?!');
			// console.log(header)
			// console.log(headerIdx)
			indexArrayMapped.push("_")
			// console.log('// - - - - - //')	
		}
	})
	return {mappedColumnsGrouped, indexArrayMapped} 
}

const categorizeFirstRow = (dataArr, indexArr, srcObj) => {
	console.log('----START categorizeFirstRow-----');
	console.log('JSON.stringify(indexArr)')
	console.log(JSON.stringify(indexArr))
	
	//first-row consistent vars
	let resObj = {}		//row-object, holding {StateName: {...content}}
	let thisID;				//the column id
	let thisState;		//row name
	
	dataArr.forEach((itm, idx) => {
		console.log('---STARTING idx---')
		console.log(idx)
		console.log('itm')
		console.log(itm)
		console.log('indexArr[idx]')
		console.log(indexArr[idx])
		let storageStr = indexArr[idx]
		//id column
		if(idx == 0){
			thisID = itm;

		//state-name column
		}else if(idx == 1){
			console.log('IDX === 1')
			console.log('itm')
			console.log(itm)
			
			
			thisState = itm;
			resObj[itm] = JSON.parse(JSON.stringify(groupedObj))
			resObj[itm]["id"] = thisID;
			console.log('idx 1 => resObj')
			console.log(resObj)
			
		}else if([2,3].includes(idx) || indexArr[idx] === "_"){
			return;
		}else if(indexArr[idx][0] == '_'){
			console.log('DASH');
			return;
		
		//data-columns
		}else{
			console.log('ELS!!')
				console.log('itm')
				console.log(itm)
				console.log('idx')
				console.log(idx)
				if(!resObj[thisState]){
					resObj[thisState] = {}
				}

				let thisStateObj = resObj[thisState]
				
				console.log('storageStr')
				console.log(storageStr)
				
				const storageArr = storageStr.split('.')
				console.log('storageArr')
				console.log(storageArr)
				let firstLevel = thisStateObj[storageArr[0]]
				// console.log('firstLevel')
				// console.log(firstLevel)
				
				let whereToStore = firstLevel[storageArr[1]]
				if(storageArr.length == 3){
					whereToStore = thisStateObj[storageArr[0]][storageArr[1]][storageArr[2]]
				}
				whereToStore.push(itm)
		}
		console.log('//--- --- ---//');
	})

	return resObj;
}

jsonParseFile('./../../src/mockData/justHeaderRow.csv')
.then(headerData => {
	debug('\x1b[32m%s\x1b[0m',`jsonParseHeaderFile THEN`)
	let sorted = headerData.sort()

	//extract "meaningful" data from input
	let {mappedColumnsGrouped, indexArrayMapped } = groupIntoCategories(sorted)
	console.log('indexArrayMapped.length')
	console.log(indexArrayMapped.length)	
	
	jsonParseFile('./../../src/mockData/firstRow.csv').then(firstRow => {
		let resObj = categorizeFirstRow(firstRow, indexArrayMapped, groupedObj)
		console.log('resObj')
		console.log(JSON.stringify(resObj))
		
	})
	
})