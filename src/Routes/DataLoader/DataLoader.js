import React, { 
	Fragment, 
	useState, 
	useEffect, 
	useMemo 
} from 'react';
import {
	fileOnLoader, 
	fileOnError, 
	prepHeaders,
	prepRows
} from './helpers';
import DataTable from './../../Components/DataTable'

// HTML5 File api
// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications

const DataLoader = () => {
	const [fileData, setFileData] = useState(null)
	const [tableData, setTableData] = useState(null)
	const [thisReader] = useState(new FileReader())
	const [setupReader, setSetupReader] = useState(false)
	const [error, setError] = useState(null);
	const [rowCount, setRowCount] = useState(5)

	//callback on reader.onload
	const prepTableData = data => {
		/*
			https://react-table.js.org/quickstart
		*/
		const headers = prepHeaders(data[0])
		const rows = prepRows(data)
		setTableData({headers, rows})
	}
	//setup reader methods in this effect
	useEffect(() => {
		if(!setupReader){
			thisReader.onload = e => fileOnLoader(e, prepTableData);
			thisReader.onerror = e => fileOnError(e, setError);
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
			{!tableData && <input type="file" id="data-loader" onChange={onUpload}/>}
			{tableData && <DataTable tableData={tableData} rowCount={rowCount}/>}
		</Fragment>
	)
};

export default DataLoader;
