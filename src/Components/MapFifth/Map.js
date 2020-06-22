import React, { useState, useEffect, useRef } from 'react';
import * as dg from 'd3-geo'
import * as d3Select from 'd3-selection'
import * as d3Z from 'd3-zoom'
import './Map.css'
import Rtt from 'react-tooltip'
// https://github.com/topojson/topojson-client
import * as topo from "topojson-client"

const MapComponent = () => {
	
	const [divSize] = useState({w: 975, h: 610})
	const [centerX] = useState(divSize.w / 2)
	const [centerY] = useState(divSize.h / 2)
	const [paths, setPaths] = useState(null)
	const [tooltipText, setTooltipText] = useState(null)
	const [ttClass, setTTClass] = useState('tooltip hidden')
	const [mouseOffset, setMouseOffset] = useState([])
	const [stateData, setStateData] = useState(null)
	const [fetchedData, setFetchedData] = useState(false)
	const svgRef = useRef()
	const gRef = useRef()

	// Styling
	const [strokeColor] = useState(`rgb(105,105,105)`)
	const [strokeW] = useState(.25)

	let selectedState = null;


	//mock data fetch
	useEffect(() => {
		if(!fetchedData){
			const FetchData = async () => {
				// https://github.com/topojson/us-atlas
				const usData = require('./../../mockData/us-10m.json')
				setStateData(usData)
			}
			FetchData()
			setFetchedData(true)
		}
	},[fetchedData])

	//use d3 to enable d3-zooming!
	useEffect(() => {
		if(svgRef && 
			svgRef.current &&
			gRef &&
			gRef.current
			&& stateData
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

		  const clickedState = async d => {
		  	const gSelection = d3Select.select(gRef.current)
		  	var x, y, k;
		    const didNotClickCurrentState = selectedState !== d
		    if (d && didNotClickCurrentState) {
		      var centroid = d3Path.centroid(d);
		      
		      x = centroid[0];
		      y = centroid[1];
		      k = 4;
		      selectedState = d;
		    } else {
		      x = divSize.w / 2;
		      y = divSize.h / 2;
		      k = 1;
		      selectedState = null;
		    }

		    //set class, pick-up orange color
		    gSelection.selectAll("path")
		      .classed("active", selectedState ? d => d === selectedState : false);

		    gSelection.transition()
		        .duration(550)
		        .attr("transform", `translate(${ centerX },${centerY}) scale(${k}) translate(${-x},${-y})`)
		  }

			const enterStates = e => {
		    e.append("path")
		    .attr("d", d3Path)
		    .style('vector-effect', 'non-scaling-stroke')
		    .attr('class', 'boundary')
		  	.on('click', clickedState)
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
			
			const stateFeats = topo.feature(stateData, stateData.objects.states).features
			
	   	const statePathsDJ = d3SVG
	    	.select('#g-wrapper').selectAll('path')
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