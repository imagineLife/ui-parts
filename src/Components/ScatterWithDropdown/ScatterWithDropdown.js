import React, { useEffect, useState, Fragment } from 'react';
import './ScatterWithDropdown.css'

const ScatterWithDropdown = ({data}) => {
	const [xAxisColumn, setXaxisColumn] = useState(null)
	const [yAxisColumn, setYaxisColumn] = useState(null)
	const [showXDD, setShowXDD] = useState(false)
	const [showYDD, setShowYDD] = useState(false)

	console.log('data')
	console.log(data)
	
	let xAxisPicker;
	if(!xAxisColumn){
		xAxisPicker = (
				<div className="dropdown">
				  <button 
				  	onClick={() => {
				  		setShowXDD(!showXDD)
				  	}} 
				  	className="dropbtn">
				  		X-Axis Value
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
		)
	}

	let yAxisPicker;
	if(!yAxisColumn){
		yAxisPicker = (
			<div className="dropdown">
			  <button 
			  	onClick={() => {
			  		setShowYDD(!showYDD)
			  	}} 
			  	className="dropbtn">
			  		Y-Axis Value
			  	</button>
			  <ul id="myDropdown" className={`dropdown-content ${showYDD ? 'open': ''}`}>
			    {data.headers.map((h, hIdx) => (
			    	<li
			    		key={`x-data-${h.Header}`}
			    		onClick={() => {
			    			setYaxisColumn(h.Header)
			    			setShowYDD(false)
			    		}}
			    	>
			    		{h.Header}
			    	</li>
			    ))}
			  </ul>
			</div>
		)
	}

	if(xAxisColumn){
		xAxisPicker = <Fragment>
			<span className="chosen-axis">X-Axis</span>
			<span className="chosen-axis-value">{xAxisColumn}</span>
		</Fragment>
	}

	if(yAxisColumn){
		yAxisPicker = <Fragment>
			<span className="chosen-axis">Y-Axis</span>
			<span className="chosen-axis-value">{yAxisColumn}</span>
		</Fragment>
	}
	return(
		<Fragment>
			<p>Scatter With Dropdown</p>
			{xAxisPicker}
			{yAxisPicker}
		</Fragment>)
};

export default ScatterWithDropdown;
