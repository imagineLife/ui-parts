const fs = require('fs')
const rl = require('readline')

const jsonParseCSVFile = (fileStr) => {
	let i = 0
	let resData = []
	return new Promise((resolve,reject) => {
		var lineReader = rl.createInterface({
		  input: fs.createReadStream(fileStr)
		});
		lineReader.on('line', function (line) {
			if(i < 10){
				i = i + 1;
				csvArr = line.split(',');
				resData.push(csvArr)
			}else{
				i = i + 1;
				return;
			}
		});

		lineReader.on('close', () => {
			resolve(resData)
		});
	})
}

jsonParseCSVFile('./../../src/mockData/cleaned.csv').then(csvData => {
	console.log('csvData')
	console.log(csvData)
	
})