const fs = require('fs')
const rl = require('readline')
const util = require('util')
const debug = util.debuglog('review')

const jsonParseHeaderFile = (fileStr) => {
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

	const indexArrayMapped = []

	srcArr.map((header, headerIdx) => {
		//AGE
		if(header.match(/AGE/)){
			if(header.match(/Under 5/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.<5.percentBelowPoverty`)
					groupedObj.age["<5"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.<5.total`)
					groupedObj.age["<5"].total.push({"title": header, "idx": headerIdx})
				}else{
					indexArrayMapped.push(`age.<5.belowPoverty`)
					groupedObj.age["<5"].belowPoverty.push({"title": header, "idx": headerIdx})
				}
			}

			if(header.match(/17/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.5-17.percentBelowPoverty`)
					groupedObj.age["5-17"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.5-17.total`)
					groupedObj.age["5-17"].total.push({"title": header, "idx": headerIdx})
				}else{
					indexArrayMapped.push(`age.5-17.belowPoverty`)
					groupedObj.age["5-17"].belowPoverty.push({"title": header, "idx": headerIdx})
				}
			}

			if(header.match(/34/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.18-34.percentBelowPoverty`)
					groupedObj.age["18-34"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.18-34.total`)
					groupedObj.age["18-34"].total.push({"title": header, "idx": headerIdx})
				}else{
					indexArrayMapped.push(`age.18-34.belowPoverty`)
					groupedObj.age["18-34"].belowPoverty.push({"title": header, "idx": headerIdx})
				}
			}

			if(header.match(/35/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.35-64.percentBelowPoverty`)
					groupedObj.age["35-64"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.35-64.total`)
					groupedObj.age["35-64"].total.push({"title": header, "idx": headerIdx})
				}else{
					indexArrayMapped.push(`age.35-64.belowPoverty`)
					groupedObj.age["35-64"].belowPoverty.push({"title": header, "idx": headerIdx})
				}
			}

			if(header.match(/65/)){
				if(header.match(/Percent/)){
					indexArrayMapped.push(`age.65+.percentBelowPoverty`)
					groupedObj.age["65+"].percentBelowPoverty.push({"title": header, "idx": headerIdx})
				}
				else if(header.match(/Total/)){
					indexArrayMapped.push(`age.65+.total`)
					groupedObj.age["65+"].total.push({"title": header, "idx": headerIdx})
				}else{
					indexArrayMapped.push(`age.65+.belowPoverty`)
					groupedObj.age["65+"].belowPoverty.push({"title": header, "idx": headerIdx})
				}
			}
		}

		//SEX
		if(header.match(/SEX/)){
			if(header.match(/Percent/)){
				indexArrayMapped.push(`gender.percentBelowPoverty`)
				groupedObj.gender.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				indexArrayMapped.push(`gender.total`)
				groupedObj.gender.total.push({"title": header, "idx": headerIdx})
			}else{
				indexArrayMapped.push(`gender.belowPoverty`)
				groupedObj.gender.belowPoverty.push({"title": header, "idx": headerIdx})
			}
		}

		//EDUCATION
		if(header.match(/EDUCATION/)){
			if(header.match(/Percent/)){
				indexArrayMapped.push(`education.percentBelowPoverty`)
				groupedObj.education.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				indexArrayMapped.push(`education.total`)
				groupedObj.education.total.push({"title": header, "idx": headerIdx})
			}else{
				indexArrayMapped.push(`education.belowPoverty`)
				groupedObj.education.belowPoverty.push({"title": header, "idx": headerIdx})
			}
		}

		//INCOME
		if(header.match(/INCOME/)){
			if(header.match(/Percent/)){
				indexArrayMapped.push(`income.percentBelowPoverty`)
				groupedObj.income.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				indexArrayMapped.push(`income.total`)
				groupedObj.income.total.push({"title": header, "idx": headerIdx})
			}else{
				indexArrayMapped.push(`income.belowPoverty`)
				groupedObj.income.belowPoverty.push({"title": header, "idx": headerIdx})
			}
		}

		//race
		if(header.match(/RACE/)){
			if(header.match(/Percent/)){
				indexArrayMapped.push(`race.percentBelowPoverty`)
				groupedObj.race.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				indexArrayMapped.push(`race.total`)
				groupedObj.race.total.push({"title": header, "idx": headerIdx})
			}else{
				indexArrayMapped.push(`race.belowPoverty`)
				groupedObj.race.belowPoverty.push({"title": header, "idx": headerIdx})
			}
		}
	})
	return {groupedObj, indexArrayMapped} 
}

jsonParseHeaderFile('./../../src/mockData/justHeaderRow.csv')
.then(headerData => {
	debug('\x1b[32m%s\x1b[0m',`jsonParseHeaderFile THEN`)
	let sorted = headerData.sort()
	let {groupedObj, indexArrayMapped } = groupIntoCategories(sorted)
	console.log('groupedObj')
	console.log(JSON.stringify(groupedObj))
	console.log('indexArrayMapped')
	console.log(JSON.stringify(indexArrayMapped))
	
	
})