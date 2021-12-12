export default `
// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//VARS
let svgWidth = width + margin.left + margin.right;
let svgHeight = height + margin.top + margin.bottom;
let gTransX = margin.left;
let gTransY = margin.top;

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
      .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(mockData, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate("+0+", "+height+")")
      .call(d3.axisBottom(x));

  // set the parameters for the histogram
  const histogram = d3.histogram()
      .value(function(d) { return d.price; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins

  // And apply this function to data to get the bins
  const bins = histogram(mockData);

  // Y axis: scale and draw:
  const y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg.append("g")
      .call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  svg.selectAll("rect")
      .data(bins)
      .join("rect")
        .attr("x", 1)
    .attr("transform", function(d) { return "translate("+ x(d.x0) +"," + y(d.length) + ")"})
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1})
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "orange")
  
  // Function to compute density
  function kernelDensityEstimator(kernel, X) {
    return function(V) {
      return X.map(function(x) {
        return [x, d3.mean(V, function(v) { return kernel(x - v); })];
      });
    };
  }
  function kernelEpanechnikov(k) {
    return function(v) {
      return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
  }
`