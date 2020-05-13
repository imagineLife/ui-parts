import React from 'react';
import ColorLegendComp from './../../Components/ColorLegend'

const ColorLegend = ({color, axis, ticks}) => {
	return(<div id="color-legend">
			<h1>Color Legend Route</h1>
			<ColorLegendComp 
				color={color} 
				axis={axis} 
				ticks={ticks} 
				size={{h: 100, w: 400}}
			/>
		</div>)		
};

export default ColorLegend;
