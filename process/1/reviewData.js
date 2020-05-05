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

	srcArr.map((header, headerIdx) => {
		if([0,1,2,3].includes(headerIdx)){
			indexArrayMapped.push("_")
			return;
		}
		//AGE
		if(header.match(/AGE/)){
			if(header.match(/Under 5/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.<5.percentBelowPoverty`)
					mappedColumnsGrouped.age["<5"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.<5.total`)
					mappedColumnsGrouped.age["<5"].total.push({"title": header, "idx": headerIdx})
				}else{
					indexArrayMapped.push(`age.<5.belowPoverty`)
					mappedColumnsGrouped.age["<5"].belowPoverty.push({"title": header, "idx": headerIdx})
				}
			}

			else if(header.match(/17/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.5-17.percentBelowPoverty`)
					mappedColumnsGrouped.age["5-17"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.5-17.total`)
					mappedColumnsGrouped.age["5-17"].total.push({"title": header, "idx": headerIdx})
				}else{
					indexArrayMapped.push(`age.5-17.belowPoverty`)
					mappedColumnsGrouped.age["5-17"].belowPoverty.push({"title": header, "idx": headerIdx})
				}
			}

			else if(header.match(/34/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.18-34.percentBelowPoverty`)
					mappedColumnsGrouped.age["18-34"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.18-34.total`)
					mappedColumnsGrouped.age["18-34"].total.push({"title": header, "idx": headerIdx})
				}else{
					indexArrayMapped.push(`age.18-34.belowPoverty`)
					mappedColumnsGrouped.age["18-34"].belowPoverty.push({"title": header, "idx": headerIdx})
				}
			}

			else if(header.match(/35/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.35-64.percentBelowPoverty`)
					mappedColumnsGrouped.age["35-64"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.35-64.total`)
					mappedColumnsGrouped.age["35-64"].total.push({"title": header, "idx": headerIdx})
				}else{
					indexArrayMapped.push(`age.35-64.belowPoverty`)
					mappedColumnsGrouped.age["35-64"].belowPoverty.push({"title": header, "idx": headerIdx})
				}
			}

			else if(header.match(/65/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.65+.percentBelowPoverty`)
					mappedColumnsGrouped.age["65+"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.65+.total`)
					mappedColumnsGrouped.age["65+"].total.push({"title": header, "idx": headerIdx})
				}else{
					indexArrayMapped.push(`age.65+.belowPoverty`)
					mappedColumnsGrouped.age["65+"].belowPoverty.push({"title": header, "idx": headerIdx})
				}
			}

			else{
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
			}else{
				indexArrayMapped.push(`gender.belowPoverty`)
				mappedColumnsGrouped.gender.belowPoverty.push({"title": header, "idx": headerIdx})
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
			}else{
				indexArrayMapped.push(`education.belowPoverty`)
				mappedColumnsGrouped.education.belowPoverty.push({"title": header, "idx": headerIdx})
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
			}else{
				indexArrayMapped.push(`income.belowPoverty`)
				mappedColumnsGrouped.income.belowPoverty.push({"title": header, "idx": headerIdx})
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
			}else{
				indexArrayMapped.push(`race.belowPoverty`)
				mappedColumnsGrouped.race.belowPoverty.push({"title": header, "idx": headerIdx})
			}
			return;
		}
	})
	return {mappedColumnsGrouped, indexArrayMapped} 
}

const categorizeFirstRow = (dataArr, indexArr, srcObj) => {
	console.log('----START-----');
	console.log('indexArr.length')
	console.log(indexArr.length)
	
	let resObj = {}		//state-object
	let thisID;				//the column id
	let thisState;		//state-name string
	
	dataArr.forEach((itm, idx) => {
		console.log('---STARTING idx---')
		console.log(idx)
		console.log('itm')
		console.log(itm)
		console.log('indexArr[idx]')
		console.log(indexArr[idx])
		let storageStr = indexArr[idx]
		console.log('storageStr')
		console.log(storageStr)
		
		//id column
		if(idx === 0){
			thisID = itm;

		//state-name column
		}else if(idx === 1){
			thisState = itm;
			resObj[itm] = JSON.parse(JSON.stringify(groupedObj))
			resObj[itm]["id"] = thisID;

		}else if([2,3].includes(idx)){
			return;
		//data-columns
		}else{
				const thisStateObj = resObj[thisState]
				
				const storageArr = storageStr.split('.')
				console.log('storageArr')
				console.log(storageArr)
				
				let whereToStore = thisStateObj[storageArr[0]][storageArr[1]]
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
	console.log('indexArrayMapped')
	console.log(indexArrayMapped)
	
	jsonParseFile('./../../src/mockData/firstRow.csv').then(firstRow => {
		let resObj = categorizeFirstRow(firstRow, indexArrayMapped, groupedObj)
		console.log('resObj')
		console.log(resObj)
		
	})
	
})