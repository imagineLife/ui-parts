import React, { 
	useEffect, 
	useState, 
	useRef 
} from 'react';
import * as ds from 'd3-scale';
import * as dsc from 'd3-scale-chromatic'
import * as d3Color from 'd3-color';
import * as d3Arr from 'd3-array'

const ColorLegendComp = (props) => {

	//state for holding colorLegend
	const colorScaleRef = useRef()
	const [ colorApplied, setColorApplied] = useState(false)

	//apply d3 + Canvas logic to colorLegend Ref
	useEffect(() => {
		if(colorScaleRef && colorScaleRef.current && !colorApplied){

			const canvasObj = colorScaleRef.current
			
			//prepare the d3 color-scale
			const colorScale = ds
				.scaleSequential(dsc.interpolateGreens)
				.domain([0,props.size.h])

			//legend scale
			var legendScale = ds.scaleLinear()
        .range([props.size.h, 1])
        .domain(colorScale.domain());
			
			// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
			var canvasContext = canvasObj.getContext("2d");

			//... based on http://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5
		  let image = canvasContext.createImageData(1, props.size.h); //props.size.h || 150, props.size.w || 500

		  d3Arr.range(props.size.h).forEach(function(idx){
          const c = d3Color.rgb(colorScale(legendScale.invert(idx)));
          image.data[4*idx] = c.r;
          image.data[4*idx + 1] = c.g;
          image.data[4*idx + 2] = c.b;
          image.data[4*idx + 3] = 255;
        })

      canvasContext.putImageData(image, 0, 0);
		  setColorApplied(true)
		}

	},[colorScaleRef, colorApplied, setColorApplied])

	const h = props.size && props.size.h || 150;
	const w = props.size && props.size.w || 500;

	return (<div>
		<canvas 
			ref={colorScaleRef}
			width={1}
			height={h}
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
