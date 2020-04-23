import React, { Fragment, useState, useEffect } from 'react';

// HTML5 File api
// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications

const DataLoader = () => {
	const [fileData, setFileData] = useState(null)
	const [tableData, setTableData] = useState(null)
	const [thisReader] = useState(new FileReader())
	const [setupReader, setSetupReader] = useState(false)

	const fileOnLoader = (e) => {
		console.log('onLoad!');
	}

	const fileOnError = (e) => {
		console.log('E');
		console.log(e);
	}

	//setup reader methods in this effect
	useEffect(() => {
		if(!setupReader){
			thisReader.onload = fileOnLoader;
			thisReader.onerror = fileOnError;
			setSetupReader(true)
		}
	}, [setupReader])

	const onUpload = (e) => {
		let thisFile = e.target.files[0];
		thisReader.readAsText(thisFile)
	}
	
	return(
		<Fragment>
			<p>DataLoader</p>
			<input type="file" id="data-loader" onChange={onUpload}/>
			{fileData && <p>IS fileData!</p>}
		</Fragment>
	)
};

export default DataLoader;



/*
	handleFiles
		getAsText(files[0])
			var reader = new FileReader();
      
      // Read file into memory as UTF-8      
      reader.readAsText(fileToRead);
      
      // Handle errors load
      reader.onload = loadHandler;
      reader.onerror = errorHandler;
*/
