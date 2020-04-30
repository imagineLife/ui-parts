import React from 'react';

const Circle = ({cx, cy,r, fill, fillOpacity, stroke,onMouseOver,strokeWidth,strokeOpacity}) => (
	<circle 
		cx={cx}
		cy={cy}
		r={r}
		fill={fill}
		fillOpacity={fillOpacity}
		stroke={stroke}
		onMouseOver={onMouseOver}
	  strokeWidth={strokeWidth}
			  strokeOpacity={strokeOpacity}/>);

export default Circle;
