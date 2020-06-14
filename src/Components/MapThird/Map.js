import React, { useState, useEffect, useRef } from 'react';
import * as dg from 'd3-geo'
import * as d3Select from 'd3-selection'
import * as d3Z from 'd3-zoom'
import './Map.css'

// https://github.com/topojson/topojson-client
import * as topo from "topojson-client"

// https://github.com/topojson/us-atlas
import topofile from './../../mockData/states-10m.json'

const Map = () => {
	
	const [divSize] = useState({w: 975, h: 610})
	const [paths, setPaths] = useState(null)
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

			//get svg && g elements in d3-land
			const d3SVG = d3Select.select(svgRef.current)
			const d3g = d3Select.select(gRef.current)

			var tooltip = d3Select.select("#map")
         .append("div")
         .attr("class", "tooltip hidden");

			console.log('topofile.objects.states')
			console.log(topofile.objects.states)
			
			function showTooltip(d) {
				console.log('SHOWING...');
	      let label = d.properties.name;
	      var mouse = d3Select.mouse(d3SVG.node())
	        .map(d => parseInt(d));
	      tooltip.classed("hidden", false)
	        .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
	        .html(label);
	    }
			const d3Path = dg
			.geoPath()
			.projection(
				dg
					.geoAlbersUsa()
					.translate([487.5, 305]).scale([800]))
			
			let states = d3g.selectAll("path")
          .data(topofile.objects.states.geometries)
          .enter().append("path")
          // .attr("name", function(d) { return d.properties.name;})
          .attr('stroke', strokeColor)
					.attr('stroke-linejoin', "round")
					.attr('stroke-linecap', "round")
					.attr('stroke-width', strokeW)
          .attr("d", d => d3Path(topo.mesh(topofile, d)))
          // .attr("id", function(d) { return d.id;})
          // .on('click', selected)
          .on("mousemove", showTooltip)
          // .on("mouseout",  function(d,i) {
          //     tooltip.classed("hidden", true);
          //  });

			//zoom fn
			const zoomed = () => {
	      d3g
	        .selectAll('path') // To prevent stroke width from scaling
	        .attr('transform', d3Select.event.transform);
	    }

			const zoom = d3Z.zoom()
	      .scaleExtent([1, 8])
	      .on('zoom', zoomed);

	    d3SVG.call(zoom);
		}
	})
	
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
						ref={gRef}
					/>
			</svg>
		</div>)
};

export default Map;
