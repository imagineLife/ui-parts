export default `// data fns
const dPrice = d => d.price;
const dLength = d => d.length;

// VARS
const w = 500;
const h = 400;
const margin = {top: 10, right: 30, bottom: 30, left: 40};
const svgWidth = w + margin.left + margin.right;
const svgHeight = h + margin.top + margin.bottom;
const widthLessMargins = w - margin.left - margin.right;
const heightLessMargins = svgHeight - margin.top - margin.bottom;
const gTransX = margin.left;
const gTransY = margin.top;

// d3 state
const xDomain = [0, 1000];
const xRange = [0, widthLessMargins];
const yRange = [heightLessMargins, 0]

// setup dom elements
const chartRes = d3.select("#chart_res");
chartRes.selectAll('svg').remove();

const svg = chartRes.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr('style','background-color: unset')
const svgGroup = svg.append("g")
  .attr("transform", "translate("+gTransX+","+gTransY+")")

/*
  x-axis: data && draw
*/
const xScale = d3.scaleLinear()
    .domain(xDomain)     
    .range(xRange);
svgGroup.append("g")
    .attr("transform", "translate("+0+", "+heightLessMargins+")")
    .call(d3.axisBottom(xScale));

// use the histogram method
const histogram = d3.histogram()
    .value(dPrice)   
    .domain(xScale.domain())  // then the domain of the graphic
    .thresholds(xScale.ticks(70)); // then the numbers of bins

// And apply this function to data to get the bins
const bins = histogram(mockData);

/*
  y-axis:
  data & draw
*/
const yScale = d3.scaleLinear()
    .range(yRange)
    .domain([0, d3.max(bins, dLength)]);   
svgGroup.append("g")
    .call(d3.axisLeft(yScale));

/*
  bars
*/

svgGroup.selectAll("rect")
    .data(bins)
    .join("rect")
  .attr("transform", d => "translate("+ xScale(d.x0) +"," + yScale(d.length) + ")")
      .attr("width", d => xScale(d.x1) - xScale(d.x0) -1)
      .attr("height", d => h - yScale(d.length))
      .style("fill", "darkgreen")`