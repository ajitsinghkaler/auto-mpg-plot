(function(d3) {
  "use strict";

  const svg = d3.select("svg");

  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const margin = {
    top: 50,
    right: 130,
    bottom: 80,
    left: 140
  };
  const render = data => {
    console.log(data);
    const xValue = d => d.weight;
    const yValue = d => d.horsepower;
    const xAxisLabel = "Weight";
    const yAxisLabel = "Horsepower";
    const title = "Cars : Weight Vs HorsePower";
    const circleRadius = 10;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([0, innerHeight])
      .nice();

    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);

    const yAxis = d3
      .axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(15);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const yAxisG = g.append("g").call(yAxis);
    yAxisG.selectAll(".domain").remove();

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", "text-label")
      .attr("y", 65)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .text(xAxisLabel);

    yAxisG
      .append("text")
      .attr("class", "text-label")
      .attr("y", -70)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", `middle`)
      .text(yAxisLabel);

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", d => yScale(yValue(d)))
      .attr("cx", d => xScale(xValue(d)))
      .attr("r", circleRadius);

    g.append("text")
      .attr("y", -10)
      .text(title);
  };

  d3.csv("https://vizhub.com/curran/datasets/auto-mpg.csv").then(data => {
    data.forEach(d => {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.year = +d.year;
    });
    render(data);
  });
})(d3);
