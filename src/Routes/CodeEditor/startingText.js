export default `
// VARS
const w = 460;
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

// append the svg object to the body of the page
const chartRes = d3.select("#chart_res");
chartRes.selectAll('svg').remove();
const svg = 
  chartRes.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr('style','background-color: unset')
  .append("g")
    .attr("transform", "translate("+gTransX+","+gTransY+")")

  // X axis: scale and draw:
  const x = d3.scaleLinear()
      .domain(xDomain)     
      .range(xRange);
  svg.append("g")
      .attr("transform", "translate("+0+", "+heightLessMargins+")")
      .call(d3.axisBottom(x));

  // set the parameters for the histogram
  const histogram = d3.histogram()
      .value(d => d.price)   
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins

  // And apply this function to data to get the bins
  const bins = histogram(mockData);

  // Y axis: scale and draw:
  const y = d3.scaleLinear()
      .range(yRange);
      y.domain([0, d3.max(bins, d => d.length)]);   
  svg.append("g")
      .call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  svg.selectAll("rect")
      .data(bins)
      .join("rect")
        .attr("x", 1)
    .attr("transform", d => "translate("+ x(d.x0) +"," + y(d.length) + ")")
        .attr("width", d => x(d.x1) - x(d.x0) -1)
        .attr("height", d => h - y(d.length))
        .style("fill", "orange")`