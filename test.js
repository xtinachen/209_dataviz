var width = 500,
  height = 500,
  svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var margin = { top: 30, right: 30, bottom: 30, left: 40 },
  iwidth = width - margin.left - margin.right,
  iheight = height - margin.top - margin.bottom;

var gDrawing = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var x = d3.scaleLinear().range([0, iwidth]);
var y = d3.scaleLinear().range([iheight, 0]);

function update(myData) {
  // Data parsing, in case you need it
  const parseDate = d3.timeParse("%m/%d/%y");
  myData.forEach(function (d) {
    d.date = parseDate(d.date);
  });

  // TODO Update scale domains based on your data variables
  x.domain([0, 1]);
  y.domain([0, 1]);

  gDrawing
    .append("g")
    .attr("transform", `translate(0,${iheight})`)
    .call(d3.axisBottom(x))
    .append("text")
    .style("fill", "black")
    .style("font-size", "12pt")
    .text("xAxis")
    .attr("transform", `translate(${iwidth}, ${-20})`);

  gDrawing
    .append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .style("fill", "black")
    .style("font-size", "12pt")
    .text("yAxis")
    .attr("transform", `translate(${50}, 0)`);

  var marks = gDrawing.selectAll(".mark").data(myData);

  // Update
  marks;
  //TODO change the attribs/style of your updating mark

  // Newly created elements
  marks.enter().append("rect").attr("class", "mark"); // TODO change for the mark you want to use e.g. rect, path, etc
  //TODO change the attribs/style of your updating mark

  // Elements to remove
  marks.exit().remove();
}

d3.csv("data/nutrition_simple.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].Name);
        console.log(data[i].Age);
    }
});

// d3.csv("https://github.com/xtinachen/209_dataviz/blob/master/nutrition_simple.csv", update);



















// var width = 500,
//   height = 500,
//   svg = d3
//     .select("#chart")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);
//
// var margin = { top: 30, right: 30, bottom: 30, left: 40 },
//   iwidth = width - margin.left - margin.right,
//   iheight = height - margin.top - margin.bottom;
//
// var gDrawing = svg
//   .append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);
//
// var x = d3.scaleLinear().range([0, iwidth]);
// var y = d3.scaleLinear().range([iheight, 0]);
//
// function update(myData) {
//   //Data parsing, in case you need it
//   const parseDate = d3.time.format("%m/%_d/%Y").parse;
//   myData.forEach(function (d) {
//     d.date = parseDate(d.date);
//   });
//
//   // TODO Update scale domains based on your data variables
//   x.domain([0, myData.map(function(d) { return d.Date })]);
//   y.domain([0, myData.map(function(d) { return d.Cals })]);
//
//   gDrawing
//     .append("g")
//     .attr("transform", `translate(0,${iheight})`)
//     .call(d3.axisBottom(x))
//     .append("text")
//     .style("fill", "black")
//     .style("font-size", "12pt")
//     .text("xAxis")
//     .attr("transform", `translate(${iwidth}, ${-20})`);
//
//   gDrawing
//     .append("g")
//     .call(d3.axisLeft(y))
//     .append("text")
//     .style("fill", "black")
//     .style("font-size", "12pt")
//     .text("yAxis")
//     .attr("transform", `translate(${50}, 0)`);
//
//   var marks = gDrawing.selectAll(".mark").data(myData);
//
//   // Update
//   marks;
//   //TODO change the attribs/style of your updating mark
//
//   // Newly created elements
//   marks.enter().append("rect").attr("class", "mark"); // TODO change for the mark you want to use e.g. rect, path, etc
//   //TODO change the attribs/style of your updating mark
//
//   // Elements to remove
//   marks.exit().remove();
// }
//
// // add update to .csv later
// var myData = d3.csv("nutrition_simple.csv", function(error, data) {
//
//   data.forEach(function(d) {
//     d.date = parseDate(d.date);
//     d.cals = +d.value
//   });
//
// update(myData);
//
// // function(error, data){
// //   if (error) {
// //     throw error;
// //   }
// //
// //   xScale.domain(data.map(function(d) { return d.date; }));
// //   yScale.domain([0, d3.max(data, function(d) { return d.cals; })]);
// //
// //   g.append("g")
// //     .attr("transform", "translate(0," + height + ")")
// //     .call(d3.axisBottom(xScale));
// //
// //   g.append("g")
// //     .call(d3.axisLeft(yScale).tickFormat(function(d){
// //       return "$" + d;
// //     }).ticks(10))
// //     .append("text")
// //     .attr("y", 6)
// //     .attr("dy", "0.73em")
// //     .attr("text_anchor", "end")
// //     .text("value");
