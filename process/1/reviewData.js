const fs = require('fs')
const rl = require('readline')
const util = require('util')
const debug = util.debuglog('review')

const jsonParseFile = (fileStr) => {
	debug('\x1b[32m%s\x1b[0m',`jsonParseFile`)
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
			"percentBelowPoverty"	: [],
			"total": [],
			"belowPoverty": []
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

	srcArr.map((header, headerIdx) => {
		//AGE
		if(header.match(/AGE/)){
			if(header.match(/Percent/)){
				groupedObj.age.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				groupedObj.age.total.push({"title": header, "idx": headerIdx})
			}else{
				groupedObj.age.belowPoverty.push({"title": header, "idx": headerIdx})
			}
		}

		//SEX
		if(header.match(/SEX/)){
			if(header.match(/Percent/)){
				groupedObj.gender.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				groupedObj.gender.total.push({"title": header, "idx": headerIdx})
			}else{
				groupedObj.gender.belowPoverty.push({"title": header, "idx": headerIdx})
			}
		}

		//EDUCATION
		if(header.match(/EDUCATION/)){
			if(header.match(/Percent/)){
				groupedObj.education.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				groupedObj.education.total.push({"title": header, "idx": headerIdx})
			}else{
				groupedObj.education.belowPoverty.push({"title": header, "idx": headerIdx})
			}
		}

		//INCOME
		if(header.match(/INCOME/)){
			if(header.match(/Percent/)){
				groupedObj.income.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				groupedObj.income.total.push({"title": header, "idx": headerIdx})
			}else{
				groupedObj.income.belowPoverty.push({"title": header, "idx": headerIdx})
			}
		}

		//race
		if(header.match(/RACE/)){
			if(header.match(/Percent/)){
				groupedObj.race.percentBelowPoverty.push({"title": header, "idx": headerIdx})
			}
			else if(header.match(/Total/)){
				groupedObj.race.total.push({"title": header, "idx": headerIdx})
			}else{
				groupedObj.race.belowPoverty.push({"title": header, "idx": headerIdx})
			}
		}
	})
	return groupedObj
}

jsonParseFile('./../../src/mockData/justHeaderRow.csv').then(headerData => {
	debug('\x1b[32m%s\x1b[0m',`jsonParseFile THEN`)
	let sorted = headerData.sort()
	let grouped = groupIntoCategories(sorted)
	console.log('grouped')
	console.log(JSON.stringify(grouped))
	
})