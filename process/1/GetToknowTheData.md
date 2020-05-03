# Getting To Know the Data
Here, census data will be reviewed.  
After, the data will be re-organized from a csv input format to a json object.

- make a file csv file that includes ONLY the headers, no data
	- this allows for less work while parsing header data in javaScript 
- Here, i call this header-data-only file "justHeaderRow.csv"
- parse the data headers using a node process
```
const fs = require('fs')
const rl = require('readline')

const jsonParseFile = (fileStr) => {
	return new Promise((resolve,reject) => {
		var lineReader = rl.createInterface({
		  input: fs.createReadStream(fileStr)
		});

		let resData = []
		lineReader.on('line', function (line) {
				let csvArr = line.split(',');
				resData.push(csvArr)
		});

		lineReader.on('close', () => {
			console.log('CLOSED');	
			resolve(resData)
		});
	})
}
jsonParseFile('./../../src/mockData/justHeaderRow.csv')
```
Here...
- import 2 modules, fs and readline
	- [fs](https://nodejs.org/api/fs.html#fs_file_system) for reading the csv file from the filesystem
		- here I use the [createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options) method of the fs module, 
	- [readline](https://nodejs.org/api/readline.html#readline_readline), for reading the file data line by line
-  build a ```jsonParseFile``` function that...
	- parses a file
	- returns a [resolved JavaScript Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) , passing along the header data at the end of the promise
	-utilize the readLine createInterface to parse the incoming stream from the fs.createReadStream
		the [readline class interface](https://nodejs.org/api/readline.html#readline_class_interface) offers a few [events](https://nodejs.org/api/events.html#events_events) me as a developer can take advantage of:
		- close **this one I'm using** to resolve the promise
		- line **this one I'm using** to parse the incoming line
		- pause
		- resume
		- SIGCONT
		- SIGINT
		- SIGSTP
	- in summary, the details of this function...
		- create a promise object
		- instantiate a readLine stream interface, here called lineReader
		- associate a callback fn on the 'line' event of the lineReader
			- the callback fn here splits the incoming line && passes the split incoming line to a placeholder array
		- associates a callback fn on the 'close' event of the lineReader
			- the callback fn here resolves the js promise object
	- 
	