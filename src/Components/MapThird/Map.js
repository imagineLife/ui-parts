import React, { useState, useEffect, useRef } from 'react';
import * as dg from 'd3-geo'
import * as d3Select from 'd3-selection'
import * as d3Z from 'd3-zoom'
import './Map.css'
import Rtt from 'react-tooltip'
// https://github.com/topojson/topojson-client
import * as topo from "topojson-client"

// https://github.com/topojson/us-atlas
import topofile from './../../mockData/states-geojson.json'

const MapComponent = () => {
	
	const [divSize] = useState({w: 975, h: 610})
	const [paths, setPaths] = useState(null)
	const [tooltipText, setTooltipText] = useState(null)
	const [tooltipClass, setTooltipClass] = useState('tooltip hidden');
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
		    .style("stroke", "#fff")
		    .style("stroke-width", "1")
		    .style('vector-effect', 'non-scaling-stroke')
		    .attr('class', 'boundary')
		    .on('mouse')
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

	   	const statePathsDJ = d3SVG
	    	.selectAll("path")
	    	.data(topofile.features)
  		statePathsDJ.join(enterStates, updateStates)
		}
	})

	const myProjection = dg
		.geoAlbersUsa()
		.translate([487.5, 305]).scale([800]);

	const d3Path = dg
		.geoPath()
		.projection(myProjection);
	
	return(
		<div id="map-wrapper">
			<svg 
				viewBox="0 0 975 610"
				id="map-box"
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
			<div 
				id="tooltip" 
				className={tooltipClass}>
					{tooltipText}
			</div>
		</div>)
};

export default MapComponent;