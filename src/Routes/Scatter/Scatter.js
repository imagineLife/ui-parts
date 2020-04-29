import React from 'react';
import Chart from './../../Components/Chart';

const Scatter = ({x, y}) => {

	//prep min/max && paired incoming data
	let xStats = {
		min: null,
		max: null
	}
	let yStats = {
		min: null, 
		max: null,
	}

	let resData = []

	//loop through incoming data && update prepped objs above
	x.forEach((xElm, xIdx) => {
		if(xElm < xStats.min || xStats.min === null) xStats.min = xElm;
		if(xElm > xStats.max || xStats.max === null) xStats.max = xElm;
		if(y[xIdx] < yStats.min || yStats.min === null) yStats.min = y[xIdx];
		if(y[xIdx] > yStats.max || yStats.max === null) yStats.max = y[xIdx];
		resData.push({
			x: xElm,
			y: y[xIdx]
		})
	})

	console.log('resData')
	console.log(resData)
	console.log('xStats')
	console.log(xStats)
	console.log('yStats')
	console.log(yStats)
	
	//merge both sets with keys x && y
	// get linear scales of both x && y
	// get min && max of both x & y
	

	return(<p>Scatter</p>)
};

export default Scatter;
