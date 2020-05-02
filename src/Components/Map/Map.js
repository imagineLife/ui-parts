import React, { useState, useEffect, useRef } from 'react';
import * as dg from 'd3-geo'

const Map = () => {
	// const 
	const [g3Path] = useState(dg.geoPath())
	const mapRef = useRef()

	//after ref is established
	useEffect(() => {
		if(mapRef && mapRef.current){
			console.log('mapRef.current')
			console.log(mapRef.current)
		}
	}, [mapRef])

	return(
		<div id="map-wrapper">
			<h3>Map</h3>
			<div id="map-box" ref={mapRef}></div>
		</div>)
};

export default Map;
