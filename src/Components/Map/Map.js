import React, { useState, useEffect, useRef } from 'react';
import * as dg from 'd3-geo'
import { feature } from "topojson-client"

import topofile from './../../mockData/statesLayers.geojson'
const Map = () => {
	// const 
	// const [thisProj] = useState()
	const mapRef = useRef()
	const [divSize] = useState({w: 500, h: 500})
	const [updatedFeats] = useState(feature(topofile, topofile).features)
	const [paths, setPaths] = useState(null)

	//after ref is established
	useEffect(() => {
		if(mapRef && mapRef.current && !paths){
			const thesePaths = topofile.features.map((feat,fIdx) => {
				const calcd = dg.geoPath().projection(dg.geoAlbersUsa().translate([250,250]).scale([500]))(feat)
				return <path
					key={`feature-${fIdx}`} 
					d={calcd} 
					style={{
					stroke: 'gray',
					stokeWidth: 1,
					fill: 'none'
				}} />
			})
			setPaths(thesePaths)
		}
	}, [mapRef, paths])


	return(
		<div id="map-wrapper">
			<h3>Map</h3>
			<svg style={{width: divSize.w, height: divSize.h}} id="map-box" ref={mapRef}>
				{paths && paths}
			</svg>
		</div>)
};

export default Map;
