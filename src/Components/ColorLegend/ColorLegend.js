import React, { 
	useEffect, 
	useState, 
	useRef 
} from 'react';
import * as ds from 'd3-scale';
import * as dsc from 'd3-scale-chromatic'

const ColorLegendComp = (props) => {

	//state for holding colorLegend
	const colorScaleRef = useRef()
	const [ colorApplied, setColorApplied] = useState(false)

	//apply d3 + Canvas logic to colorLegend Ref
	useEffect(() => {
		if(colorScaleRef && colorScaleRef.current && !colorApplied){

			const canvasObj = colorScaleRef.current
			//prepare the d3 color-scale
			const colorScale = ds.scaleSequential(dsc.interpolateGreens)
			
			// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
			var canvasContext = canvasObj.getContext("2d");

			//... based on http://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5
		  var image = canvasContext.createImageData(1, props.size.h || 150);

		  setColorApplied(true)

		}
	},[colorScaleRef, colorApplied, setColorApplied])

	const h = props.size && props.size.h || 150;
	const w = props.size && props.size.w || 500;

	return (<div>
		<canvas 
			ref={colorScaleRef}
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
