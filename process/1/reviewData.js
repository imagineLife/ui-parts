const fs = require('fs')
const rl = require('readline')
const util = require('util')
const debug = util.debuglog('review')

//result placeholder
let groupedObj = {
	"state": "",
	"percentBelowPoverty": {
		"age": {
			"<5": 0,
			"5-17": 0,
			"18-34": 0,
			"35-64": 0,
			"65+": 0
		},
		"gender": {
			"male": 0,
			"female": 0
		},
		"education": {
			"noHS":0,
			"hsGrad":0,
			"someCollege":0,
			"bachPlus":0,
			"total":0,
		},
		"race": {
			"white": 0,
			"black": 0,
			"Native American*": 0,
			"Asian": 0,
			"Pacific Islander*": 0,
			"Mixed": 0,
			"Latino*": 0
		}
	},
	"belowPoverty":{
		"age": {
			"<5": 0,
			"5-17": 0,
			"18-34": 0,
			"35-64": 0,
			"65+": 0
		},
		"gender": {
			"male": 0,
			"female": 0
		},
		"education": {
			"noHS":0,
			"hsGrad":0,
			"someCollege":0,
			"bachPlus":0,
			"total":0,
		},
		"race": {
			"white": 0,
			"black": 0,
			"Native American*": 0,
			"Asian": 0,
			"Pacific Islander*": 0,
			"Mixed": 0,
			"Latino*": 0
		}
	},
	"total": {
		"age": {
			"<5": 0,
			"5-17": 0,
			"18-34": 0,
			"35-64": 0,
			"65+": 0
		},
		"gender": {
			"male": 0,
			"female": 0
		},
		"education": {
			"noHS":0,
			"hsGrad":0,
			"someCollege":0,
			"bachPlus":0,
			"total":0,
		},
		"race": {
			"white": 0,
			"black": 0,
			"Native American*": 0,
			"Asian": 0,
			"Pacific Islander*": 0,
			"Mixed": 0,
			"Latino*": 0
		}
	}
}

let mappedColumnsGrouped = {
	"state": "",
	"percentBelowPoverty": {
		"age": {
			"<5": {},
			"5-17": {},
			"18-34": {},
			"35-64": {},
			"65+": {}
		},
		"gender": {
			"male": {},
			"female": {}
		},
		"education": {
			"noHS":{},
			"hsGrad":{},
			"someCollege":{},
			"bachPlus":{},
			"total":{},
		},
		"race": {
			"white": {},
			"black": {},
			"Native American*": {},
			"Asian": {},
			"Pacific Islander*": {},
			"Mixed": {},
			"Latino*": {}
		}
	},
	"belowPoverty": {
		"age": {
			"<5": {},
			"5-17": {},
			"18-34": {},
			"35-64": {},
			"65+": {}
		},
		"gender": {
			"male": {},
			"female": {}
		},
		"education": {
			"noHS":{},
			"hsGrad":{},
			"someCollege":{},
			"bachPlus":{},
			"total":{},
		},
		"race": {
			"white": {},
			"black": {},
			"Native American*": {},
			"Asian": {},
			"Pacific Islander*": {},
			"Mixed": {},
			"Latino*": {}
		}
	},
	"total": {
		"age": {
			"<5": {},
			"5-17": {},
			"18-34": {},
			"35-64": {},
			"65+": {}
		},
		"gender": {
			"male": {},
			"female": {}
		},
		"education": {
			"noHS":{},
			"hsGrad":{},
			"someCollege":{},
			"bachPlus":{},
			"total":{},
		},
		"race": {
			"white": {},
			"black": {},
			"Native American*": {},
			"Asian": {},
			"Pacific Islander*": {},
			"Mixed": {},
			"Latino*": {}
		}
	}
}

const jsonParseSingleRow = (fileStr) => {
	debug('\x1b[32m%s\x1b[0m',`jsonParseHeaderFile`)
	return new Promise((resolve,reject) => {
		var lineReader = rl.createInterface({
		  input: fs.createReadStream(fileStr)
		});

		let i = 0
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
		if([2,3].includes(headerIdx)){
			indexArrayMapped.push("_")
			return;
		}

		//IGNORE THESE
		else if(header.match(/EMPLOYMENT STATUS/) || header.match(/WORK EXPERIENCE/) || header.match(/RATIOS/)){
			indexArrayMapped.push("_")
			return;
		}


		//AGE
		else if(header.match(/AGE/)){
			if(header.match(/Under 5/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`percentBelowPoverty.age.<5`)
					mappedColumnsGrouped.percentBelowPoverty.age["<5"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`total.age.<5`)
					mappedColumnsGrouped.total.age["<5"] = ({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`belowPoverty.age.<5`)
					mappedColumnsGrouped.belowPoverty.age["<5"] = ({"title": header, "idx": headerIdx})
					return;
				}else{
					indexArrayMapped.push("_")
					return;
				}
			}

			else if(header.match(/17/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`percentBelowPoverty.age.5-17`)
					mappedColumnsGrouped.percentBelowPoverty.age["5-17"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`total.age.5-17`)
					mappedColumnsGrouped.total.age["5-17"] = ({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`belowPoverty.age.5-17`)
					mappedColumnsGrouped.belowPoverty.age["5-17"] = ({"title": header, "idx": headerIdx})
					return;
				}else{
					indexArrayMapped.push("_")
					return;
				}
			}

			else if(header.match(/34/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`percentBelowPoverty.age.18-34`)
					mappedColumnsGrouped.percentBelowPoverty.age["18-34"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`total.age.18-34`)
					mappedColumnsGrouped.total.age["18-34"] = ({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`belowPoverty.age.18-34`)
					mappedColumnsGrouped.belowPoverty.age["18-34"] = ({"title": header, "idx": headerIdx})
					return;
				}else{
					indexArrayMapped.push("_")
					return;
				}
			}

			else if(header.match(/35/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`percentBelowPoverty.age.35-64`)
					mappedColumnsGrouped.percentBelowPoverty.age["35-64"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`total.age.35-64`)
					mappedColumnsGrouped.total.age["35-64"] = ({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`belowPoverty.age.35-64`)
					mappedColumnsGrouped.belowPoverty.age["35-64"] = ({"title": header, "idx": headerIdx})
					return;
				}else{
					indexArrayMapped.push("_")
					return;
				}
			}

			else if(header.match(/65/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`percentBelowPoverty.age.65+`)
					mappedColumnsGrouped.percentBelowPoverty.age["65+"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`total.age.65+`)
					mappedColumnsGrouped.total.age["65+"] = ({"title": header, "idx": headerIdx})
					return;
				}else if(header.match(/Below poverty/)){
					indexArrayMapped.push(`belowPoverty.age.65+`)
					mappedColumnsGrouped.belowPoverty.age["65+"] = ({"title": header, "idx": headerIdx})
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
			if(header.match(/Percent/)){
				if(header.match(/Female/)){
					indexArrayMapped.push(`percentBelowPoverty.gender.female`)
					mappedColumnsGrouped.percentBelowPoverty.gender.female = ({"title": header, "idx": headerIdx})
					return;
				}
				else{
					indexArrayMapped.push(`percentBelowPoverty.gender.male`)
					mappedColumnsGrouped.percentBelowPoverty.gender.male = ({"title": header, "idx": headerIdx})
					return;
				}
			}
			else if(header.match(/Total/)){
				if(header.match(/Female/)){
					indexArrayMapped.push(`total.gender.female`)
					mappedColumnsGrouped.total.gender.female = ({"title": header, "idx": headerIdx})
					return;
				}
				else{
					indexArrayMapped.push(`total.gender.male`)
					mappedColumnsGrouped.total.gender.male = ({"title": header, "idx": headerIdx})
					return;
				}
			}else if(header.match(/Below poverty/)){
				if(header.match(/Female/)){
					indexArrayMapped.push(`belowPoverty.gender.female`)
					mappedColumnsGrouped.belowPoverty.gender.female = ({"title": header, "idx": headerIdx})
					return;
				}
				else{
					indexArrayMapped.push(`belowPoverty.gender.male`)
					mappedColumnsGrouped.belowPoverty.gender.male = ({"title": header, "idx": headerIdx})
					return;
				}
			}else{
				indexArrayMapped.push("_")
				return;
			}
		}

		//EDUCATION
		else if(header.match(/EDUCATION/)){
			if(header.match(/Percent/)){
				if(header.match(/Bachelor/)){
					indexArrayMapped.push(`percentBelowPoverty.education.bachPlus`)
					mappedColumnsGrouped.percentBelowPoverty.education.bachPlus = ({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Some/)){
					indexArrayMapped.push(`percentBelowPoverty.education.someCollege`)
					mappedColumnsGrouped.percentBelowPoverty.education.someCollege = ({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/High/)){
					indexArrayMapped.push(`percentBelowPoverty.education.hsGrad`)
					mappedColumnsGrouped.percentBelowPoverty.education.hsGrad = ({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Less/)){
					indexArrayMapped.push(`percentBelowPoverty.education.noHS`)
					mappedColumnsGrouped.percentBelowPoverty.education.noHS = ({"title": header, "idx": headerIdx})	
					return;
				}else{
					indexArrayMapped.push(`percentBelowPoverty.education.total`)
					mappedColumnsGrouped.percentBelowPoverty.education.total = ({"title": header, "idx": headerIdx})	
					return;
				}
			}
			else if(header.match(/Total/)){
				if(header.match(/Bachelor/)){
					indexArrayMapped.push(`total.education.bachPlus`)
					mappedColumnsGrouped.total.education.bachPlus = ({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Some/)){
					indexArrayMapped.push(`total.education.someCollege`)
					mappedColumnsGrouped.total.education.someCollege = ({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/High/)){
					indexArrayMapped.push(`total.education.hsGrad`)
					mappedColumnsGrouped.total.education.hsGrad = ({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Less/)){
					indexArrayMapped.push(`total.education.noHS`)
					mappedColumnsGrouped.total.education.noHS = ({"title": header, "idx": headerIdx})	
					return;
				}else{
					indexArrayMapped.push(`total.education.total`)
					mappedColumnsGrouped.total.education.total = ({"title": header, "idx": headerIdx})	
					return;
				}
			}else if(header.match(/Below poverty/)){
				if(header.match(/Bachelor/)){
					indexArrayMapped.push(`belowPoverty.education.bachPlus`)
					mappedColumnsGrouped.belowPoverty.education.bachPlus = ({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Some/)){
					indexArrayMapped.push(`belowPoverty.education.someCollege`)
					mappedColumnsGrouped.belowPoverty.education.someCollege = ({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/High/)){
					indexArrayMapped.push(`belowPoverty.education.hsGrad`)
					mappedColumnsGrouped.belowPoverty.education.hsGrad = ({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Less/)){
					indexArrayMapped.push(`belowPoverty.education.noHS`)
					mappedColumnsGrouped.belowPoverty.education.noHS = ({"title": header, "idx": headerIdx})	
					return;
				}else{
					indexArrayMapped.push(`belowPoverty.education.total`)
					mappedColumnsGrouped.belowPoverty.education.total = ({"title": header, "idx": headerIdx})	
					return;
				}
			}else{
				indexArrayMapped.push("_")
				return;
			}
		}

		//race
		else if(header.match(/RACE/)){
			if(header.match(/below poverty level/)){
				if(header.match(/Black/)){
					indexArrayMapped.push(`percentBelowPoverty.race.black`)
					mappedColumnsGrouped.percentBelowPoverty.race.black = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Indian/)){
					indexArrayMapped.push(`percentBelowPoverty.race.Native American*`)
					mappedColumnsGrouped.percentBelowPoverty.race["Native American*"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Asian/)){
					indexArrayMapped.push(`percentBelowPoverty.race.Asian`)
					mappedColumnsGrouped.percentBelowPoverty.race["Asian"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Pacific/)){
					indexArrayMapped.push(`percentBelowPoverty.race.Pacific Islander*`)
					mappedColumnsGrouped.percentBelowPoverty.race["Pacific Islander*"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Other/)){
					indexArrayMapped.push(`percentBelowPoverty.race.Other`)
					mappedColumnsGrouped.percentBelowPoverty.race["Other"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/any/)){
					indexArrayMapped.push(`percentBelowPoverty.race.Mixed`)
					mappedColumnsGrouped.percentBelowPoverty.race["Mixed"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/Latino/)){
					indexArrayMapped.push(`percentBelowPoverty.race.Latino*`)
					mappedColumnsGrouped.percentBelowPoverty.race["Latino*"] = ({"title": header, "idx": headerIdx})
					return;
				}
				else if(header.match(/White/)){
					indexArrayMapped.push(`percentBelowPoverty.race.white`)
					mappedColumnsGrouped.percentBelowPoverty.race["white"] = ({"title": header, "idx": headerIdx})
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
			indexArrayMapped.push("_")
			return;
		}
	})
	return {mappedColumnsGrouped, indexArrayMapped} 
}

const categorizeFirstRow = (dataArr, indexArr, srcObj, headerData) => {
	// console.log('----START categorizeFirstRow-----');
	
	//first-row consistent vars
	let thisID;				//the column id
	
	dataArr.forEach((itm, idx) => {
		let storageStr = indexArr[idx]
		//id column
		if(idx == 0){
			thisID = itm;

		//state-name column
		}else if(idx == 1){
			srcObj.state = itm;
			srcObj.id = thisID;
			
		}else if([2,3].includes(idx) || indexArr[idx] === "_"){
			return;
		}else if(!indexArr[idx] || indexArr[idx][0] == '_'){
			return;
		
		//data-columns
		}else{
			const storageArr = storageStr.split('.')

			let firstLevel = srcObj[storageArr[0]]
			let lastChildKey = firstLevel[storageArr[1]]
			if(storageArr.length == 3){
				lastChildKey = srcObj[storageArr[0]][storageArr[1]][storageArr[2]]
			}
			srcObj[storageArr[0]][storageArr[1]][storageArr[2]] = parseFloat(itm);
			return;
		}
	})

	return srcObj;
}

jsonParseSingleRow('./../../src/mockData/justHeaderRow.csv')
.then(headerData => {
	debug('\x1b[32m%s\x1b[0m',`jsonParseHeaderFile THEN`)
	//extract "meaningful" data from input
	let {mappedColumnsGrouped, indexArrayMapped } = groupIntoCategories(headerData)

	jsonParseSingleRow('./../../src/mockData/firstRow.csv').then(firstRow => {
		let resObj = categorizeFirstRow(firstRow, indexArrayMapped, groupedObj, headerData)
	})
	
})