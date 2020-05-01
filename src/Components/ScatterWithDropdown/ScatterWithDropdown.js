import React, { useEffect, useState, Fragment } from 'react';
import './ScatterWithDropdown.css'
import Scatter from './../../Routes/Scatter'
import AxisPickerDD from './../AxisPickerDD';

const ScatterWithDropdown = ({data}) => {
	const [xAxisColumn, setXaxisColumn] = useState(null)
	const [yAxisColumn, setYaxisColumn] = useState(null)
	const [showXDD, setShowXDD] = useState(false)
	const [showYDD, setShowYDD] = useState(false)
	const [ySearchVal, setYSearchVal] = useState('')
	const [xSearchVal, setXSearchVal] = useState('')
	let [xData, setXData] = useState(null)
	let [yData, setYData] = useState(null)
	
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
			  	<input onChange={e => {
			  		setXSearchVal(e.target.value)
			  	}} value={xSearchVal}/>
			    {data.headers.map((h, hIdx) => {
			    	let thisItem = <li
			    		key={`x-data-${h.Header}`}
			    		onClick={() => {
			    			setXaxisColumn(h.Header)
			    			setShowXDD(false)
			    			setXData(data.rows.map((row,rIdx) => parseInt(row[`col${hIdx}`])))
			    		}}
			    	>
			    		{h.Header}
			    	</li>

					  //if no searchItem
					  if(xSearchVal.length == 0){
					  	return thisItem;
					  } 

					  //if input txt includes search text
			    	if(h.Header.includes(xSearchVal)){
			    		return thisItem;
			    	}else { 
			    		return null 
			    	}
			    }).filter(d => d)}
			  </ul>
			</div>
		)
	}

	let yAxisPicker;
	if(!yAxisColumn){
		yAxisPicker = (
			<AxisPickerDD 
				btnCB={() => setShowYDD(!showYDD)}
				axisName="Y"
				show={showYDD}
				inpChange={e => {
		  		setYSearchVal(e.target.value)
		  	}}
		  	inputVal={ySearchVal}
		  	ddData={data.headers}
		  	ddItemClickCB={({columnTxt, selectedColIdx}) => {
    			setYaxisColumn(columnTxt)
    			setShowYDD(false)
    			setYData(data.rows.map((row,rIdx) => parseInt(row[`col${selectedColIdx}`])))
    		}}
			/>
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
			{ xAxisColumn && 
				yAxisColumn && 
				xData && 
				yData && 
				<Scatter x={xData} y={yData} />
			}
		</Fragment>)
};

export default ScatterWithDropdown;