import React, { useEffect, useState, Fragment } from 'react';
import './ScatterWithDropdown.css'

const ScatterWithDropdown = ({data}) => {
	const [xAxisColumn, setXaxisColumn] = useState(null)
	const [yAxisColumn, setYaxisColumn] = useState(null)
	const [showXDD, setShowXDD] = useState(false)

	console.log('data')
	console.log(data)
	
	if(!xAxisColumn){
		return(
			<Fragment>
				<div className="dropdown">
				  <button 
				  	onClick={() => {
				  		setShowXDD(!showXDD)
				  	}} 
				  	className="dropbtn">
				  		Dropdown
				  	</button>
				  <ul id="myDropdown" className={`dropdown-content ${showXDD ? 'open': ''}`}>
				    {data.headers.map((h, hIdx) => (
				    	<li
				    		key={`x-data-${h.Header}`}
				    		onClick={() => {
				    			setXaxisColumn(h.Header)
				    			setShowXDD(false)
				    		}}
				    	>
				    		{h.Header}
				    	</li>
				    ))}
				  </ul>
				</div>
			</Fragment>
		)
	}
	return(<p>Scatter With Dropdown</p>)
};

export default ScatterWithDropdown;
