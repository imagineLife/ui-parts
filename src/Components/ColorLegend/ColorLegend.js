import React, { useEffect, useState} from 'react';
import * as ds from 'd3-scale';

const ColorLegendComp = (props) => {
	const [colorScale, setColorScale] = useState(null)

	// build colorScale?!
	useEffect(() => {
		if(!colorScale){
			// let thisScale = ds.scaleSequential(ds.interpolateGreens);
			// console.log('thisScale')
			// console.log(thisScale)
			console.log('ds.interpolateGreens')
			console.log(ds.interpolateGreens)
			
			setColorScale(true)
		}
	})
	
	const h = props.size && props.size.h || 150;
	const w = props.size && props.size.w || 500;

	return (<svg 
		className="color-legend"
		style={{
			height: h,
			width: w
		}}>color legend comp</svg>)
};

export default ColorLegendComp;
