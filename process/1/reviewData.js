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
		"percentBelowPoverty"	: {
			"percent": [],
			"noHS": [],
			"hsGrad": [],
			"someCollege": [],
			"bachPlus": []
		},
		"total": {
			"total": [],
			"noHS": [],
			"hsGrad": [],
			"someCollege": [],
			"bachPlus": []
		},
		"belowPoverty": {
			"total": [],
			"noHS": [],
			"hsGrad": [],
			"someCollege": [],
			"bachPlus": []
		}
	},
	"race": {
		"percentBelowPoverty"	: {
			"white": [],
			"black": [],
			"Native American*": [],
			"Asian": [],
			"Pacific Islander*": [],
			"Other": [],
			"Mixed": [],
			"Latino*": []
		},
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
		"percentBelowPoverty"	: {
			"percent": [],
			"noHS": [],
			"hsGrad": [],
			"someCollege": [],
			"bachPlus": []
		},
		"total": {
			"total": [],
			"noHS": [],
			"hsGrad": [],
			"someCollege": [],
			"bachPlus": []
		},
		"belowPoverty": {
			"total": [],
			"noHS": [],
			"hsGrad": [],
			"someCollege": [],
			"bachPlus": []
		}
	},
	"race": {
		"percentBelowPoverty"	: {
			"white": [],
			"black": [],
			"Native American*": [],
			"Asian": [],
			"Pacific Islander*": [],
			"Other": [],
			"Mixed": [],
			"Latino*": []
		},
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
		console.log('header');
		console.log(headerIdx);
		if([2,3].includes(headerIdx)){
			indexArrayMapped.push("_")
			return;
		}

		//IGNORE THESE
		else if(header.match(/EMPLOYMENT STATUS/) || header.match(/WORK EXPERIENCE/) || header.match(/RATIOS/)){
			console.log(`PUSH _ ${headerIdx}`);
			indexArrayMapped.push("_")
			return;
		}


		//AGE
		else if(header.match(/AGE/)){
			console.log(`AGE ${headerIdx}`);
			if(header.match(/Under 5/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.<5.percentBelowPoverty`)
					mappedColumnsGrouped.age["<5"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.<5.total`)
					mappedColumnsGrouped.age["<5"].total.push({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`age.<5.belowPoverty`)
					mappedColumnsGrouped.age["<5"].belowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}else{
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
					indexArrayMapped.push(`age.65+.total`)
					mappedColumnsGrouped.age["65+"].total.push({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`age.65+.belowPoverty`)
					mappedColumnsGrouped.age["65+"].belowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}else{
					indexArrayMapped.push("_")
					return;
				}
			}

			else{
				indexArrayMapped.push("_")
				return;
			}
		}

		//SEX
		else if(header.match(/SEX/)){
			console.log(`SEX ${headerIdx}`);
			if(header.match(/Percent/)){
				indexArrayMapped.push(`gender.percentBelowPoverty`)
				mappedColumnsGrouped.gender.percentBelowPoverty.push({"title": header, "idx": headerIdx})
				return;
			}
			else if(header.match(/Total/)){
				indexArrayMapped.push(`gender.total`)
				mappedColumnsGrouped.gender.total.push({"title": header, "idx": headerIdx})
				return;
			}else if(header.match(/Below poverty/)){
				indexArrayMapped.push(`gender.belowPoverty`)
				mappedColumnsGrouped.gender.belowPoverty.push({"title": header, "idx": headerIdx})
				return;
			}else{
				indexArrayMapped.push("_")
				return;
			}
		}

		//EDUCATION
		else if(header.match(/EDUCATION/)){
			console.log(`EDUCATION ${headerIdx}`);
			if(header.match(/Percent/)){
				if(header.match(/Bachelor/)){
					indexArrayMapped.push(`education.percentBelowPoverty.bachPlus`)
					mappedColumnsGrouped.education.percentBelowPoverty.bachPlus.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Some/)){
					indexArrayMapped.push(`education.percentBelowPoverty.someCollege`)
					mappedColumnsGrouped.education.percentBelowPoverty.someCollege.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/High/)){
					indexArrayMapped.push(`education.percentBelowPoverty.hsGrad`)
					mappedColumnsGrouped.education.percentBelowPoverty.hsGrad.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Less/)){
					indexArrayMapped.push(`education.percentBelowPoverty.noHS`)
					mappedColumnsGrouped.education.percentBelowPoverty.noHS.push({"title": header, "idx": headerIdx})	
					return;
				}else{
					indexArrayMapped.push(`education.percentBelowPoverty.percent`)
					mappedColumnsGrouped.education.percentBelowPoverty.percent.push({"title": header, "idx": headerIdx})	
					return;
				}
			}
			else if(header.match(/Total/)){
				if(header.match(/Bachelor/)){
					indexArrayMapped.push(`education.total.bachPlus`)
					mappedColumnsGrouped.education.total.bachPlus.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Some/)){
					indexArrayMapped.push(`education.total.someCollege`)
					mappedColumnsGrouped.education.total.someCollege.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/High/)){
					indexArrayMapped.push(`education.total.hsGrad`)
					mappedColumnsGrouped.education.total.hsGrad.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Less/)){
					indexArrayMapped.push(`education.total.noHS`)
					mappedColumnsGrouped.education.total.noHS.push({"title": header, "idx": headerIdx})	
					return;
				}else{
					indexArrayMapped.push(`education.total.total`)
					mappedColumnsGrouped.education.total.total.push({"title": header, "idx": headerIdx})	
					return;
				}
			}else if(header.match(/Below poverty/)){
				if(header.match(/Bachelor/)){
					indexArrayMapped.push(`education.belowPoverty.bachPlus`)
					mappedColumnsGrouped.education.belowPoverty.bachPlus.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Some/)){
					indexArrayMapped.push(`education.belowPoverty.someCollege`)
					mappedColumnsGrouped.education.belowPoverty.someCollege.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/High/)){
					indexArrayMapped.push(`education.belowPoverty.hsGrad`)
					mappedColumnsGrouped.education.belowPoverty.hsGrad.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Less/)){
					indexArrayMapped.push(`education.belowPoverty.noHS`)
					mappedColumnsGrouped.education.belowPoverty.noHS.push({"title": header, "idx": headerIdx})	
					return;
				}else{
					indexArrayMapped.push(`education.belowPoverty.total`)
					mappedColumnsGrouped.education.belowPoverty.total.push({"title": header, "idx": headerIdx})	
					return;
				}
			}else{
				indexArrayMapped.push("_")
				return;
			}
		}

		//INCOME
		else if(header.match(/INCOME/)){
			console.log(`INCOME ${headerIdx}`);
			if(header.match(/Percent/)){
				indexArrayMapped.push(`income.percentBelowPoverty`)
				mappedColumnsGrouped.income.percentBelowPoverty.push({"title": header, "idx": headerIdx})
				return;
			}
			else if(header.match(/Total/)){
				indexArrayMapped.push(`income.total`)
				mappedColumnsGrouped.income.total.push({"title": header, "idx": headerIdx})
				return;
			}else if(header.match(/Below poverty/)){
				indexArrayMapped.push(`income.belowPoverty`)
				mappedColumnsGrouped.income.belowPoverty.push({"title": header, "idx": headerIdx})
				return;
			}else{
				indexArrayMapped.push("_")
				return;
			}
			return;
		}

		//race
		else if(header.match(/RACE/)){
			console.log(`RACE ${headerIdx}`);
			/*
				"white": [],
				"black": [],
				"Native American*": [],
				"Asian": [],
				"Pacific Islander*": []
				"Other": [],
				"Mixed": [],
				"Latino*": []
			*/
			if(header.match(/below poverty level/)){
				// console.log('race below poverty header');
				// console.log(header);
				// console.log(headerIdx);
				// console.log('// - - - - - //')
				
				
				if(header.match(/Black/)){
					indexArrayMapped.push(`race.percentBelowPoverty.black`)
					mappedColumnsGrouped.race.percentBelowPoverty.black.push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Indian/)){
					indexArrayMapped.push(`race.percentBelowPoverty.Native American*`)
					mappedColumnsGrouped.race.percentBelowPoverty["Native American*"].push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Asian/)){
					indexArrayMapped.push(`race.percentBelowPoverty.Asian`)
					mappedColumnsGrouped.race.percentBelowPoverty["Asian"].push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Pacific/)){
					indexArrayMapped.push(`race.percentBelowPoverty.Pacific Islander*`)
					mappedColumnsGrouped.race.percentBelowPoverty["Pacific Islander*"].push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Other/)){
					indexArrayMapped.push(`race.percentBelowPoverty.Other`)
					mappedColumnsGrouped.race.percentBelowPoverty["Other"].push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/any/)){
					indexArrayMapped.push(`race.percentBelowPoverty.Mixed`)
					mappedColumnsGrouped.race.percentBelowPoverty["Mixed"].push({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Latino/)){
					indexArrayMapped.push(`race.percentBelowPoverty.Latino*`)
					mappedColumnsGrouped.race.percentBelowPoverty["Latino*"].push({"title": header, "idx": headerIdx})
					return;
				}else{
					indexArrayMapped.push("_")
					return;
				}
			}else{
				indexArrayMapped.push("_")
				return;
			}
		}else{
			console.log(`PUSH _ ${headerIdx}`);
			indexArrayMapped.push("_")
			return;
		}
		console.log(`RANDOM ${headerIdx}`);
	})
	return {mappedColumnsGrouped, indexArrayMapped} 
}

const categorizeFirstRow = (dataArr, indexArr, srcObj, headerData) => {
	console.log('----START categorizeFirstRow-----');
	
	// console.log('JSON.stringify(indexArr)')
	// console.log(JSON.stringify(indexArr))
	
	//first-row consistent vars
	let resObj = {}		//row-object, holding {StateName: {...content}}
	let thisID;				//the column id
	let thisState;		//row name
	
	dataArr.forEach((itm, idx) => {
		if(itm === "2719"){
			console.log('---STARTING LOOP, idx---')
			console.log(idx)
			console.log('itm')
			console.log(itm)
			console.log('indexArr[idx]')
			console.log(indexArr[idx])
			console.log('headerData[idx]')
			console.log(headerData[idx])
		}
		
		let storageStr = indexArr[idx]
		//id column
		if(idx == 0){
			thisID = itm;

		//state-name column
		}else if(idx == 1){
			thisState = itm;
			resObj[itm] = JSON.parse(JSON.stringify(groupedObj))
			resObj[itm]["id"] = thisID;
			
		}else if([2,3].includes(idx) || indexArr[idx] === "_"){
			return;
		}else if(!indexArr[idx] || indexArr[idx][0] == '_'){
			console.log('DASH');
			return;
		
		//data-columns
		}else{
			if(!resObj[thisState]){
				resObj[thisState] = {}
			}

			let thisStateObj = resObj[thisState]
			const storageArr = storageStr.split('.')
			if(itm === "51952"){
				console.log('storageArr')
				console.log(storageArr)
			}
			let firstLevel = thisStateObj[storageArr[0]]
			let lastChildKey = firstLevel[storageArr[1]]
			if(storageArr.length == 3){
				lastChildKey = thisStateObj[storageArr[0]][storageArr[1]][storageArr[2]]
			}
			lastChildKey.push(itm)
		}
	})

	return resObj;
}

jsonParseFile('./../../src/mockData/justHeaderRow.csv')
.then(headerData => {
	debug('\x1b[32m%s\x1b[0m',`jsonParseHeaderFile THEN`)
	//extract "meaningful" data from input
	let {mappedColumnsGrouped, indexArrayMapped } = groupIntoCategories(headerData)
	console.log('indexArrayMapped.length');
	console.log('indexArrayMapped.length')
	console.log(indexArrayMapped.length)
	
	
	jsonParseFile('./../../src/mockData/firstRow.csv').then(firstRow => {
		console.log('firstRow.length')
		console.log(firstRow.length)
		
		let resObj = categorizeFirstRow(firstRow, indexArrayMapped, groupedObj, headerData)
		console.log('resObj')
		console.log(JSON.stringify(resObj))
		
	})
	
})