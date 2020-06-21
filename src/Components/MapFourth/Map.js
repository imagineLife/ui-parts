import React, { useState, useEffect, useRef } from 'react';
import * as dg from 'd3-geo'
import * as d3Select from 'd3-selection'
import * as d3Z from 'd3-zoom'
import './Map.css'
import Rtt from 'react-tooltip'
// https://github.com/topojson/topojson-client
import * as topo from "topojson-client"

// https://github.com/topojson/us-atlas
import usData from './../../mockData/us-10m.json'

const MapComponent = () => {
	
	const [divSize] = useState({w: 975, h: 610})
	const [paths, setPaths] = useState(null)
	const [tooltipText, setTooltipText] = useState(null)
	const [ttClass, setTTClass] = useState('tooltip hidden')
	const [mouseOffset, setMouseOffset] = useState([])
	const svgRef = useRef()
	const gRef = useRef()

	// Styling
	const [strokeColor] = useState(`rgb(105,105,105)`)
	const [strokeW] = useState(.25)

	//use d3 to enable d3-zooming!
	useEffect(() => {
		if(svgRef && 
			svgRef.current &&
			gRef &&
			gRef.current
		){

			const pathFillFn = d => {

		      // Get data value
		      const value = d.properties.visited;

		      if (value) {
		      //If value exists…
		      return legendColorScale(value);
		      } else {
		      //If value is undefined…
		      return "rgb(213,222,217)";
		      }
		  }

			const enterStates = e => {
		    e.append("path")
		    .attr("d", d3Path)
		    .style('vector-effect', 'non-scaling-stroke')
		    .attr('class', 'boundary')
		    // .on('mousemove', (d) => {
		    // 	const d3SVG = d3Select.select('#map-box')
		    // 	const mouse = d3Select.mouse(d3SVG.node())
      // 		.map(d => parseInt(d));
		    // 	setTooltipText(d.properties.name)
		    // 	setMouseOffset(mouse)
		    // 	setTTClass('tooltip')
		    // })
		    // .on('mouseout', () => {
		    // 	setTooltipText(null)
		    // 	setTTClass('tooltip hidden')
		    // })
		  }

		  const updateStates = u => {
		  	//zoom fn
				const zoomed = () => {
		        d3Select.selectAll('path')
		        .attr('transform', d3Select.event.transform);
		    }

				const zoom = d3Z.zoom()
		      .scaleExtent([1, 8])
		      .on('zoom', zoomed);

		    d3Select.select('#map-box').call(zoom);
		  }


			//get svg && g elements in d3-land
			const d3SVG = d3Select.select('#map-box')
			const d3g = d3Select.select('#g-wrapper')
			
			const stateFeats = topo.feature(usData, usData.objects.states).features
			
	   	const statePathsDJ = d3SVG
	    	.selectAll("path")
	    	.data(stateFeats)
  		statePathsDJ.join(enterStates, updateStates)
		}
	})

	const w = 975;
	const h = 610;
	const myProjection = dg.geoMercator()
    .translate([w / 2, h / 2])
    .scale([1000]);

	const d3Path = dg
		.geoPath()
	
	return(
		<div id="map-wrapper">
			<svg 
				viewBox="0 0 975 610"
				id="map-box"
				style={{maxWidth: '900px'}}
				ref={svgRef}
			>
				<g 
					fill="none" 
					id="g-wrapper"
					stroke="#000" 
					strokeLinejoin="round" 
					strokeLinecap="round"
					ref={gRef}
				/>
			</svg>
			{tooltipText && 
				<div 
					id="tooltip" 
					className={ttClass}
					style={{left: `25px`, top: `60px`}}>
						{tooltipText}
				</div>
			}
		</div>)
};

export default MapComponent;