import React, { useState, useEffect, useRef } from 'react';
import * as dg from 'd3-geo'
import * as d3Select from 'd3-selection'
import './Map.css'

// https://github.com/topojson/topojson-client
import * as topo from "topojson-client"

// https://github.com/topojson/us-atlas
import topofile from './../../mockData/states-10m.json'

const Map = () => {
	
	const [divSize] = useState({w: 975, h: 610})
	const [paths, setPaths] = useState(null)
	const svgRef = useRef()

	// Styling
	const [strokeColor] = useState(`rgb(105,105,105)`)
	const [strokeW] = useState(.25)

	//use d3 to enable d3-zooming!
	useEffect(() => {
		if(svgRef && svgRef.current){
			let d3SVG = d3Select.select(svgRef.current)
		}
	})


	const d3Path = dg
		.geoPath()
		.projection(
			dg
				.geoAlbersUsa()
				.translate([487.5, 305]).scale([800]))

	const stateBoundaries = d3Path(topo.mesh(topofile, topofile.objects.states, (a, b) => a !== b))
	const countryBoundry = d3Path(topo.feature(topofile, topofile.objects.nation))

	return(
		<div id="map-wrapper">
			<svg 
				viewBox="0 0 975 610"
				id="map-box"
				ref={svgRef}>
					<g 
						fill="none" 
						stroke="#000" 
						strokeLinejoin="round" 
						strokeLinecap="round"
					>
						{/* State Boundaries */}
						<path 
							strokeWidth={strokeW}
							stroke={strokeColor}
							d={stateBoundaries}
						/>

					{/* Country Boundary */}
						<path 
							strokeWidth={strokeW}
							stroke={strokeColor}
							d={countryBoundry}
						/>
					</g>
			</svg>
		</div>)
};

export default Map;
