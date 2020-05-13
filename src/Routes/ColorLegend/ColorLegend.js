import React from 'react';
import ColorLegendComp from './../../Components/ColorLegend'

const ColorLegend = (props) => {
	return(<div id="color-legend">
			<h1>Color Legend Route</h1>
			<ColorLegendComp 
				{...props}
				size={{h: 35, w: 400}}
			/>
		</div>)		
};

export default ColorLegend;
