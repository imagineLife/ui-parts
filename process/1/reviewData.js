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
		"age": [],
		"gender": [],
		"income": [],
		"education": [],
		"race": []
	}

	srcArr.map((header, headerIdx) => {
		//AGE
		if(header.match(/AGE/)){
			groupedObj.age.push({"title": header, "idx": headerIdx})
		}

		//SEX
		if(header.match(/SEX/)){
			groupedObj.gender.push({"title": header, "idx": headerIdx})
		}

		//EDUCATION
		if(header.match(/EDUCATION/)){
			groupedObj.education.push({"title": header, "idx": headerIdx})
		}

		//INCOME
		if(header.match(/INCOME/)){
			groupedObj.income.push({"title": header, "idx": headerIdx})
		}

		//race
		if(header.match(/RACE/)){
			groupedObj.race.push({"title": header, "idx": headerIdx})
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