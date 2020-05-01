import React from 'react';

const AxisPickerDD = ({
	axisName,
	btnCB, 
	show, 
	inpChange, 
	inputVal,
	ddData,
	ddItemClickCB
}) => (<div className="dropdown">
			  <button 
			  	onClick={btnCB} 
			  	className="dropbtn">
			  		{`${axisName}-Axis Value`}
			  	</button>
			  <ul 
			  	id="myDropdown" 
			  	className={`dropdown-content ${show ? 'open': ''}`}>
			  	
			  	{/* Search Input */}
			  	<input 
			  		onChange={inpChange} 
			  		value={inputVal}/>


			    {ddData.map((h, hIdx) => {
			    	let thisItem = <li
					    		key={`${axisName}-data-${h.Header}`}
					    		onClick={() => {
					    			ddItemClickCB({selectedColIdx: hIdx, columnTxt: h.Header})
					    		}}
					    	>
					    		{h.Header}
					    	</li>

					  //if no searchItem
					  if(inputVal.length == 0){
					  	return thisItem;
					  } 

					  //if input txt includes search text
			    	if(h.Header.includes(inputVal)){
			    		return thisItem;
			    	}else { 
			    		return null 
			    	}
			    }).filter(d => d)}
			  </ul>
			</div>);

export default AxisPickerDD;
