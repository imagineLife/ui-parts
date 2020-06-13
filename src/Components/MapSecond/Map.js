import React, { useState, useEffect, useRef } from 'react';
import * as dg from 'd3-geo'
import { feature } from "topojson-client"
import './Map.css'

import topofile from './../../mockData/states-10m.json'

const Map = () => {
	console.log('topofile')
	console.log(topofile)
	
	const [divSize] = useState({w: 500, h: 500})
	const [paths, setPaths] = useState(null)


	return(
		<div id="map-wrapper">
			<svg 
				style={{width: divSize.w, height: divSize.h}} 
				id="map-box">
			</svg>
		</div>)
};

export default Map;
