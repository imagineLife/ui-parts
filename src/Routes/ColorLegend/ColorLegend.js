import React from 'react';
import ColorLegendComp from './../../Components/ColorLegend'

const ColorLegend = (props) => {
	return(<div id="color-legend">
			<h1>Color Legend Route</h1>
			<ColorLegendComp 
				{...props}
				size={{h: 100, w: 15}}
				axis
			/>
		</div>)		
};

export default ColorLegend;
