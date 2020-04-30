import React from 'react';
import { makeScaleType } from './../../helpers' 
import useDimensions from './../../Hooks/useDimensions'
import AxesAndMath from './../AxesAndMath'
import * as d3Shape from 'd3-shape'
import { makeLollipops, makeRect, makeCircle, makePath } from './lib'
import Circle from './../Circle'
import "./Chart.css"

const xByType = (xVal, xType, xScale) => {
	if(xType == 'string'){
		return xScale(xVal) + (xScale.bandwidth() / 2)
	}else{
		return xScale(xVal)
	}
}
const Chart = ({axis, data, w, h, chartType, groupedX, showPoints, labels}) => {
	// console.log('%c chartType', 'background-color: blue; color: white;')
	// console.log(chartType);
	
	let thisRef = React.useRef()
	const [ref, {width}] = useDimensions();
	let [margins] = React.useState({t:20, r: 10, b: 75, l: 40})	

	//destructure props	
	let {x: xAxis, y: yAxis } = axis
	let { type: xType, key: xVal } = xAxis;
	let { type: yType, key: yVal } = yAxis;

	//update scales when width is changed
	if(width && width && h && xVal){

	  //set dimensions-less-margins
	  let wLM = width - margins.l - margins.r
	  let hLM = h - margins.t - margins.b

	  /*
			Build Scales
	  */
	  let xScale = makeScaleType(xType, data, xVal, 'x', chartType, groupedX)
	  xScale.range([0, wLM]);
	  
	  let yScale = makeScaleType(yType || 'number', data, yVal, 'y', chartType, groupedX);
	  yScale.range([hLM, margins.t]);
	  
	  //re-order line data to match domain order from makeScaletype
	  if(['line', 'area'].includes(chartType)){
		  let reOrderedData = xScale.domain().map(thisXVal => {
		  	let thisDataObj = data.filter(d => d.x == thisXVal)[0]
		  	return {
		  		x: thisXVal,
		  		y: thisDataObj.y
		  	}
		  })

		  data = reOrderedData		  
		  
	  }	  
	  
	  //placeholder for optional Line fn
	  let optLineFn = d3Shape.line()
	  .defined(d => d.x !== "")
		.x(d => xScale( d.x ) + (xScale.bandwidth() / 2))
		.y(d => yScale( d.y ))
		// .curve(d3.curveBasis);

		let optAreaFn = d3Shape.area()
	  .defined(d => d.x !== "")
		.x(d => xScale( d.x ) + (xScale.bandwidth() / 2))
		.y0(hLM)
		.y1(d => yScale( d.y ))

	  /*
			Build Chart Elements
			Rects for bar
			Circles for scatterplot
			path for line-chart
	  */
	  let dataTypeShapes, optExtraPoints;


	  //Rectangles
	  if(groupedX){
	  	if(chartType == 'bar'){
		  	dataTypeShapes = data.map((d, ind) => {
			  	
			  	//Work-around?!
			  	if(d.x == ""){
			  		return
			  	}

		  		return makeRect(d, ind, xVal, xScale, yScale, hLM)

			  }).filter(d => d)
		  }

		  if(chartType == 'lollipop'){
		  	
		  	dataTypeShapes = data.map((d, ind) => {
			  	
			  	//Work-around?!
			  	if(d.x == ""){
			  		return
			  	}

		  		return makeLollipops(d,ind,xVal,yScale,xScale);

			  }).filter(d => d)
		  }

		 //line object
		 if(['line', 'area'].includes(chartType)){
	 		let calcFill = (chartType !== 'area') ? 'none' : 'steelblue'
	 		let calcStrW = (chartType !== 'area') ? 3 : 0
	 		let calcD = (chartType == 'line') ? optLineFn(data) : optAreaFn(data)
		 	
		 	dataTypeShapes = makePath(calcFill,'steelblue',calcStrW,'path', calcD)
		 	

		 	optExtraPoints = showPoints ? data.map((d, ind) => {
		 		
		 		if(d.x === ""){
		 			return null
		 		}
		 		let calcRadius = chartType == 'line' ? xScale.bandwidth() * .25 : 5
	  		let calcCX = xScale( d.x ) + (xScale.bandwidth() / 2)
	  		let calcCY = yScale(d.y)
	  		return makeCircle(xScale, yScale, d, ind, xVal, calcRadius, null, null, null, null, null, calcCX)
		 	}).filter(d => d) : null
		 }

	  }

	  if(chartType == 'scatterplot'){
	  	dataTypeShapes = data.map((d, ind) => {
	  		if(d.x == ''){
	  			return
	  		}

	  		let calcRadius = xType == 'string' ? xScale.bandwidth() * .25 : 5
	  		let calcCX = xByType(d.x, xType, xScale)
	  		let calcCY = yScale(d.y)
	  		
	  		return <Circle 
					key={xVal ? `${ind}-${xVal}` : ind}
					cx={xScale(d.x)}
					cy={yScale(d.y)}
					r={calcRadius}
					fill={'black'}
					fillOpacity={.02}
					stroke={'darkgray'}
					onMouseOver={() => {
						console.log('d')
						console.log(d)
					}}
				  strokeWidth={1}
				  strokeOpacity={'.75'}/>
	 
	  	})
	  	
	  }

	  let svgDimensions = {
	  	height: h - margins.t,
	  	width: width - margins.l
	  }
	  
	  //prep opt labels
	  let xLabel = null, yLabel = null
	  if(labels){
	  	let xTrans = 
	  	xLabel = <text 
	  	className="axis-label x" 
	  	transform={`translate(${width/2}, ${hLM + (margins.b / 2)})`} 
	  	textAnchor="middle"
	  	alignmentBaseline="hanging">
	  		{labels.x}
	  	</text>
	  	yLabel = <text className="axis-label y">{labels.y}</text>
	  }
	  return (
	  <div id="chartDiv" style={{height: h, width: w}} ref={ref}>
	  	<svg className="barChart" width={width} height="100%" style={{border: "1px solid orange"}}>
	  	  <g transform={`translate(${margins.l}, ${margins.t})`}>
	  	  	
	  	  	<AxesAndMath
	          scales={{ xScale, yScale }}
	          margins={margins}
	          svgDimensions={svgDimensions}
	        />

	  	  	{dataTypeShapes}
	  	  	{optExtraPoints}

	  	  	{xLabel && xLabel}
	  	  	{yLabel && yLabel}
	  	  </g>
	  	</svg>
	  </div>
	  )
	}

	if(!width){
		return(<div id="chartDiv" style={{height: h, width: w}} ref={ref}></div>)
	}
}

export default Chart