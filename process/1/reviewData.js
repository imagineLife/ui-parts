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
		}
	},
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
		"male": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
		"female": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		}
	},
	"education": {
		"noHS":{
			"percentBelowPoverty": [],
			"total": [],
			"belowPoverty": []
		},
		"hsGrad":{
			"percentBelowPoverty": [],
			"total": [],
			"belowPoverty": []
		},
		"someCollege":{
			"percentBelowPoverty": [],
			"total": [],
			"belowPoverty": []
		},
		"bachPlus":{
			"percentBelowPoverty": [],
			"total": [],
			"belowPoverty": []
		},
		"total":{
			"percentBelowPoverty": [],
			"total": [],
			"belowPoverty": []
		}
	},
	"race": {
		"percentBelowPoverty"	: {
			"white": [],
			"black": [],
			"Native American*": [],
			"Asian": [],
			"Pacific Islander*": [],
			"Mixed": [],
			"Latino*": []
		},
		"total": [],
		"belowPoverty": []
	}
}

let mappedColumnsGrouped = {
	"state": "",
	"percentBelowPoverty": {
		"age": {
			"<5": [],
			"5-17": [],
			"18-34": [],
			"35-64": [],
			"65+": []
		},
		"gender": {
			"male": [],
			"female": []
		},
		"education": {
			"noHS":[],
			"hsGrad":[],
			"someCollege":[],
			"bachPlus":[],
			"total":[],
		}
	},
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
		"male": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		},
		"female": {
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
		}
	},
	"education": {
		"noHS":{
			"percentBelowPoverty": [],
			"total": [],
			"belowPoverty": []
		},
		"hsGrad":{
			"percentBelowPoverty": [],
			"total": [],
			"belowPoverty": []
		},
		"someCollege":{
			"percentBelowPoverty": [],
			"total": [],
			"belowPoverty": []
		},
		"bachPlus":{
			"percentBelowPoverty": [],
			"total": [],
			"belowPoverty": []
		},
		"total":{
			"percentBelowPoverty": [],
			"total": [],
			"belowPoverty": []
		}
	},
	"race": {
		"percentBelowPoverty"	: {
			"white": [],
			"black": [],
			"Native American*": [],
			"Asian": [],
			"Pacific Islander*": [],
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
			if(header.match(/Under 5/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`percentBelowPoverty.age.<5`)
					mappedColumnsGrouped.percentBelowPoverty.age["<5"].push({"title": header, "idx": headerIdx})
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
					indexArrayMapped.push(`percentBelowPoverty.age.5-17`)
					mappedColumnsGrouped.percentBelowPoverty.age["5-17"].push({"title": header, "idx": headerIdx})
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
					indexArrayMapped.push(`percentBelowPoverty.age.18-34`)
					mappedColumnsGrouped.percentBelowPoverty.age["18-34"].push({"title": header, "idx": headerIdx})
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
					indexArrayMapped.push(`percentBelowPoverty.age.35-64`)
					mappedColumnsGrouped.percentBelowPoverty.age["35-64"].push({"title": header, "idx": headerIdx})
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
					indexArrayMapped.push(`percentBelowPoverty.age.65+`)
					mappedColumnsGrouped.percentBelowPoverty.age["65+"].push({"title": header, "idx": headerIdx})
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
			if(header.match(/Percent/)){
				if(header.match(/Female/)){
					indexArrayMapped.push(`percentBelowPoverty.gender.female`)
					mappedColumnsGrouped.percentBelowPoverty.gender.female.push({"title": header, "idx": headerIdx})
					return;
				}
				else{
					indexArrayMapped.push(`percentBelowPoverty.gender.male`)
					mappedColumnsGrouped.percentBelowPoverty.gender.male.push({"title": header, "idx": headerIdx})
					return;
				}
			}
			else if(header.match(/Total/)){
				if(header.match(/Female/)){
					indexArrayMapped.push(`gender.female.total`)
					mappedColumnsGrouped.gender.female.total.push({"title": header, "idx": headerIdx})
					return;
				}
				else{
					indexArrayMapped.push(`gender.male.total`)
					mappedColumnsGrouped.gender.male.total.push({"title": header, "idx": headerIdx})
					return;
				}
			}else if(header.match(/Below poverty/)){
				if(header.match(/Female/)){
					indexArrayMapped.push(`gender.female.belowPoverty`)
					mappedColumnsGrouped.gender.female.belowPoverty.push({"title": header, "idx": headerIdx})
					return;
				}
				else{
					indexArrayMapped.push(`gender.male.belowPoverty`)
					mappedColumnsGrouped.gender.male.belowPoverty.push({"title": header, "idx": headerIdx})
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
					mappedColumnsGrouped.percentBelowPoverty.education.bachPlus.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Some/)){
					indexArrayMapped.push(`percentBelowPoverty.education.someCollege`)
					mappedColumnsGrouped.percentBelowPoverty.education.someCollege.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/High/)){
					indexArrayMapped.push(`percentBelowPoverty.education.hsGrad`)
					mappedColumnsGrouped.percentBelowPoverty.education.hsGrad.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Less/)){
					indexArrayMapped.push(`percentBelowPoverty.education.noHS`)
					mappedColumnsGrouped.percentBelowPoverty.education.noHS.push({"title": header, "idx": headerIdx})	
					return;
				}else{
					indexArrayMapped.push(`percentBelowPoverty.education.total`)
					mappedColumnsGrouped.percentBelowPoverty.education.total.push({"title": header, "idx": headerIdx})	
					return;
				}
			}
			else if(header.match(/Total/)){
				if(header.match(/Bachelor/)){
					indexArrayMapped.push(`education.bachPlus.total`)
					mappedColumnsGrouped.education.bachPlus.total.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Some/)){
					indexArrayMapped.push(`education.someCollege.total`)
					mappedColumnsGrouped.education.someCollege.total.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/High/)){
					indexArrayMapped.push(`education.hsGrad.total`)
					mappedColumnsGrouped.education.hsGrad.total.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Less/)){
					indexArrayMapped.push(`education.noHS.total`)
					mappedColumnsGrouped.education.noHS.total.push({"title": header, "idx": headerIdx})	
					return;
				}else{
					indexArrayMapped.push(`education.total.total`)
					mappedColumnsGrouped.education.total.total.push({"title": header, "idx": headerIdx})	
					return;
				}
			}else if(header.match(/Below poverty/)){
				if(header.match(/Bachelor/)){
					indexArrayMapped.push(`education.bachPlus.belowPoverty`)
					mappedColumnsGrouped.education.bachPlus.belowPoverty.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Some/)){
					indexArrayMapped.push(`education.someCollege.belowPoverty`)
					mappedColumnsGrouped.education.someCollege.belowPoverty.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/High/)){
					indexArrayMapped.push(`education.hsGrad.belowPoverty`)
					mappedColumnsGrouped.education.hsGrad.belowPoverty.push({"title": header, "idx": headerIdx})	
					return;
				}else if(header.match(/Less/)){
					indexArrayMapped.push(`education.noHS.belowPoverty`)
					mappedColumnsGrouped.education.noHS.belowPoverty.push({"title": header, "idx": headerIdx})	
					return;
				}else{
					indexArrayMapped.push(`education.total.belowPoverty`)
					mappedColumnsGrouped.education.total.belowPoverty.push({"title": header, "idx": headerIdx})	
					return;
				}
			}else{
				indexArrayMapped.push("_")
				return;
			}
		}

		//race
		else if(header.match(/RACE/)){
			// console.log(`RACE ${headerIdx}`);

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
				}
				else if(header.match(/White/)){
					indexArrayMapped.push(`race.percentBelowPoverty.white`)
					mappedColumnsGrouped.race.percentBelowPoverty["white"].push({"title": header, "idx": headerIdx})
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
			console.log('DASH');
			return;
		
		//data-columns
		}else{
			const storageArr = storageStr.split('.')

			let firstLevel = srcObj[storageArr[0]]
			let lastChildKey = firstLevel[storageArr[1]]
			if(storageArr.length == 3){
				lastChildKey = srcObj[storageArr[0]][storageArr[1]][storageArr[2]]
			}
			if(storageArr[0] === 'percentBelowPoverty'){
				srcObj[storageArr[0]][storageArr[1]][storageArr[2]] = parseFloat(itm);
				return;
			}
			else{
				lastChildKey.push(itm)
			}
		}
	})

	return srcObj;
}

jsonParseFile('./../../src/mockData/justHeaderRow.csv')
.then(headerData => {
	debug('\x1b[32m%s\x1b[0m',`jsonParseHeaderFile THEN`)
	//extract "meaningful" data from input
	let {mappedColumnsGrouped, indexArrayMapped } = groupIntoCategories(headerData)
	jsonParseFile('./../../src/mockData/firstRow.csv').then(firstRow => {
		let resObj = categorizeFirstRow(firstRow, indexArrayMapped, groupedObj, headerData)
		console.log('resObj')
		console.log(JSON.stringify(resObj))
		
	})
	
})