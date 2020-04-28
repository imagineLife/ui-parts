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

import {
	useRouteMatch,
	NavLink,
	Route,
	Router,
	Switch
} from 'react-router-dom';

import DataTable from './../../Components/DataTable'

// HTML5 File api
// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications

const Table = () => (<p>Table</p>)
const ColStats = () => (<p>ColStats</p>)
const Scatterplot = () => (<p>Scatterpot</p>)


const DataInspector = (props) => (<p>Data Inspector Here...</p>)


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

	const r = useRouteMatch()

	const RoutesLookup = [
		{
			route: `${r.url}`,
			str: "Table",
			component: Table
		},
		{
			route: `${r.url}/colStats`,
			str: "Column Stats",
			component: ColStats
		},
		{
			route: `${r.url}/scatter`,
			str: "Scatterplot",
			component: Scatterplot
		}
	]

	return(
		<Fragment>
			{/* Conditional Nav */}
			{!tableData && <input type="file" id="data-loader" onChange={onUpload}/>}

			{tableData &&
				<Fragment>
					<nav className="data-nav">
						{RoutesLookup.map((l,idx) => (
							<NavLink key={`data-link-${idx}`} to={l.route}>{l.str}</NavLink>
						))}
					</nav>
					<Route exact path={`${r.url}`} render={() => <DataTable tableData={tableData} />} />
					<Route exact path={`${r.url}/colStats`} render={() => <ColStats data={tableData} />} />
					<Route exact path={`${r.url}/scatterplot`} render={() => <Scatterplot data={tableData} />} />
				</Fragment>
			}

		</Fragment>
	)
};

export default DataLoader; 