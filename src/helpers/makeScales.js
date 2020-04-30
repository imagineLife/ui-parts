import * as scale from 'd3-scale'
import * as arr from 'd3-array'

const makeScaleType = (dataPointType, srcData, pointName, axisName, chartType, groupedX) => {	
	
	let thisScale;
	let uniqueArr;

/*
	Scale - Type
*/
	if(dataPointType == 'number'){
		thisScale = scale.scaleLinear()
	}

	if(dataPointType !== 'number'){
		thisScale = scale.scaleLinear()
	}

	if(axisName == 'x'){ // && chartType == 'bar'
		if(chartType !== 'area' && chartType !=='scatterplot'){
			thisScale = scale.scaleBand().padding(.02)
		}
		if(chartType == 'area'){
			thisScale = scale.scaleBand()
		}
	}

/*
	Scale Domain
*/
	
	if(axisName == 'x' && dataPointType == 'number'){
		let scaleMin = [arr.min(srcData, d => d.x)]
		let scaleMax = [arr.max(srcData, d => d.x)]
		thisScale.domain([scaleMin[0], scaleMax[0]])
	}

	if(axisName == 'y'){
		let maxVal = [arr.max(srcData, d => d.y)]
		thisScale.domain([0,maxVal])
	}
	
	return thisScale
}

export default makeScaleType