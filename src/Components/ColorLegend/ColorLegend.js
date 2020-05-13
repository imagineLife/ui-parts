import React, { useEffect, useState} from 'react';
import * as ds from 'd3-scale';
import * as dsc from 'd3-scale-chromatic'

const ColorLegendComp = (props) => {

	//prepare the d3 color-scale
	const colorScale = ds.scaleSequential(dsc.interpolateGreens)
	
	const h = props.size && props.size.h || 150;
	const w = props.size && props.size.w || 500;

	return (<div>
		<canvas 
			style={{
				height: h,
				width: w
			}}
			className="color-canvas" />
		<svg 
		className="color-legend">
			color legend comp
		</svg>
	</div>)
};

export default ColorLegendComp;
