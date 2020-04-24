import React, { Fragment, useState, useEffect } from 'react';
import {fileOnLoader, fileOnError} from './helpers'

// HTML5 File api
// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications

const DataLoader = () => {
	const [fileData, setFileData] = useState(null)
	const [tableData, setTableData] = useState(null)
	const [thisReader] = useState(new FileReader())
	const [setupReader, setSetupReader] = useState(false)
	const [error, setError] = useState(null);

	//setup reader methods in this effect
	useEffect(() => {
		if(!setupReader){
			thisReader.onload = e => fileOnLoader(e, setTableData);
			thisReader.onerror = e => fileOnError(e, setError);
			setSetupReader(true)
		}
	}, [setupReader])

	const onUpload = (e) => {
		let thisFile = e.target.files[0];
		thisReader.readAsText(thisFile)
	}
	
	console.log('tableData')
	console.log(tableData)
	
	return(
		<Fragment>
			<p>DataLoader</p>
			<input type="file" id="data-loader" onChange={onUpload}/>
			{fileData && <p>IS fileData!</p>}
		</Fragment>
	)
};

export default DataLoader;