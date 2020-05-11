const fs = require('fs')
const rl = require('readline')
const { categorizeSingleRow, prepForMongoConsumption } = require('./helpers')
const specialArrMapping = require('./mappingArr')

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

const jsonParseCSVFile = (fileStr) => {
	let i = 0
	let resData = []
	let headerRow = []
	//return a promise
	return new Promise((resolve,reject) => {

		//read line-by-line from incoming stream
		var lineReader = rl.createInterface({
		  input: fs.createReadStream(fileStr)
		});

		lineReader.on('line', function (line) {
				csvArr = line.split(',');
				if(i === 0){
					headerRow = csvArr
				}
				if(i > 0){
					let categorizedRow = categorizeSingleRow(csvArr, specialArrMapping, JSON.parse(JSON.stringify(groupedObj)), headerRow)
					resData.push(categorizedRow)
				}
				i = i + 1;
		});

		lineReader.on('close', () => {
			resolve(resData)
		});
	})
}

jsonParseCSVFile('./../../src/mockData/cleaned.csv')
.then(prepForMongoConsumption)
.then(resStr => {
	console.log('resStr')
	console.log(resStr)

	/*
		OUTPUT
		- json objects ready to import into a MongoDB

		MONGO COMMAND
		mongoimport --db povertystates --collection states --drop --file states.json
	*/
})