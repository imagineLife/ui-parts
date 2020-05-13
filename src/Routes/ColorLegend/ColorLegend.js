import React from 'react';
import ColorLegendComp from './../../Components/ColorLegend'

const ColorLegend = (props) => {
	return(<div id="color-legend">
			<h1>Color Legend Route</h1>
			<ColorLegendComp 
				{...props}
				size={{h: 600, w: 35}}
			/>
		</div>)		
};

export default ColorLegend;
