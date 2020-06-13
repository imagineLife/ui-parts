import React, { useState, useEffect, useRef } from 'react';
import * as dg from 'd3-geo'
import { feature } from "topojson-client"
import './Map.css'

import topofile from './../../mockData/statesLess.geojson'
const Map = () => {
	// const 
	// const [thisProj] = useState()
	const mapRef = useRef()
	const [divSize] = useState({w: 500, h: 500})
	// const [updatedFeats] = useState(feature(topofile, topofile).features)
	const [paths, setPaths] = useState(null)

	//after ref is established
	useEffect(() => {
		console.log('inside Effect!');
		if(mapRef && mapRef.current && !paths){
			console.log('INSIDE IF');
			const thesePaths = topofile.features.map((feat,fIdx) => {
				return dg.geoPath().projection(dg.geoAlbersUsa().translate([250,250]).scale([500]))(feat)
			})
			setPaths(thesePaths)
		}
	}, [mapRef, paths])

	useEffect(() => {
		if(paths){
			console.log('Register zoom listener here?!');
		}
	},[paths])


	return(
		<div id="map-wrapper">
			<svg 
				style={{width: divSize.w, height: divSize.h}} 
				id="map-box" 
				ref={mapRef}>
				{!paths && <text x={divSize.w / 2} y={divSize.h / 2}>loading paths...</text>}
				{paths && paths.map((p, pIdx) => (
					<path
						key={`feature-${pIdx}`} 
						d={p} 
						style={{
						stroke: 'gray',
						stokeWidth: 1,
						fill: 'none'
					}} />
				))}
				}
			</svg>
		</div>)
};

export default Map;
