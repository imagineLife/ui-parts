import React, { 
	useEffect, 
	useState, 
	useRef 
} from 'react';
import * as ds from 'd3-scale';
import * as dsc from 'd3-scale-chromatic'
import * as d3Color from 'd3-color';
import * as d3Arr from 'd3-array'

const ColorLegendComp = ({size, axis}) => {

	//state for holding colorLegend
	const colorScaleRef = useRef()
	const [ colorApplied, setColorApplied] = useState(false)
	const [hasAxis, setHasAxis] = useState(false)

	//apply Canvas logic to colorLegend Ref
	useEffect(() => {
		if(colorScaleRef && colorScaleRef.current && !colorApplied){

			//store ref in var
			const canvasObj = colorScaleRef.current
			
			//heightDomainArr
			const heightDomain = [0,size.h]
			//prepare the d3 color-scale
			const colorScale = ds
				.scaleSequential(dsc.interpolateGreens)
				.domain(heightDomain)

			//legend scale
			var linearHeightScale = ds.scaleLinear()
        .range([size.h, 1])
        .domain(heightDomain);
			
			// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
			var canvasContext = canvasObj.getContext("2d");

			//... based on http://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5
		  let image = canvasContext.createImageData(1, size.h); //size.h || 150, size.w || 500

		  //loop through height number && produce color values
		  d3Arr.range(size.h).forEach(function(idx){

		  	//get inverted height-scale px val from height
		  	let heightPx = linearHeightScale(idx);

		  	//apply colorScale to px height
		  	let colorScaledVal = colorScale(heightPx)
		  	
		  	//get rgb color from color-scale
		  	let {r,g,b} = d3Color.rgb(colorScaledVal)

        //apply rgba to img-data in sets of 4
        //img data is store as rgba repeated (rgbargbargba)
        // https://www.w3schools.com/tags/canvas_createimagedata.asp
        let i4 = 4*idx
        image.data[i4] = r;
        image.data[i4 + 1] = g;
        image.data[i4 + 2] = b;
        image.data[i4 + 3] = 255;
      })

      canvasContext.putImageData(image, 0, 0);
		  setColorApplied(true)
		}

	},[colorScaleRef, colorApplied, setColorApplied])

	//build axis
	useEffect(() => {
		if(axis && !hasAxis && colorApplied){
			

			setHasAxis(true)
		}
	},[axis, hasAxis, colorApplied])

	const h = size && size.h || 150;
	const w = size && size.w || 500;

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
