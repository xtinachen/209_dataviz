var nutrition_categories = ['fat', 'carbs', 'protein']; //CHANGED
var all_categories = ['calories', 'fat', 'carbs', 'protein']; //CHANGED

// set dimensions and margins
var width = 500,
  height = 500,
  svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// adds second chart svg canvas
var width = 500,
  height = 500,
  svg2 = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var margin = { top: 30, right: 80, bottom: 30, left: 40 },
  iwidth = width - margin.left - margin.right,
  iheight = height - margin.top - margin.bottom;

// append svg object to body of page - assigns it to gDrawing
var gDrawing = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var gDrawing2 = svg2
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// set ranges
var x = d3.scaleTime()
//  .domain([new Date("2020-04-01"), new Date("2020-06-01")])
  .range([0, iwidth]);
//console.log(x)
var y = d3.scaleLinear().range([iheight, 0]);
var y2 = d3.scaleLinear().range([iheight, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10).domain(all_categories); //CHANGED

//implement update function
function update(myData) {

  //console.log(myData)
  // Data parsing
  const parseDate = d3.timeParse("%m/%d/%Y");
  //console.log("parsedate", parseDate)
  myData.forEach(function (d) {
    d.date = parseDate(d.date)
    //console.log(d.date);
  });


  // TODO Update scale domains based on your data variables
// set scale for calories plot
  x.domain(d3.extent(myData, function(d) {return d.date; }));
  //console.log(x)
  // add break point
  y.domain([0, 2500]);
  y2.domain([0, 300]);

  // Adds X Axis
  gDrawing
    .append("g")
    .attr("transform", `translate(0,${iheight})`)
    .call(d3.axisBottom(x))
    .append("text")
    .style("fill", "black")
    .style("font-size", "10pt")
    .text("Date")
    .attr("transform", `translate(${iwidth}, ${-10})`);

// Adds Y Axis
  gDrawing
    .append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .style("fill", "black")
    .style("font-size", "10pt")
    .text("Calories")
    .attr("transform", `translate(${50}, -10)`);

//second chart axis
  gDrawing2
    .append("g")
    .attr("transform", `translate(0,${iheight})`)
    .call(d3.axisBottom(x))
    .append("text")
    .style("fill", "black")
    .style("font-size", "10pt")
    .text("Date")
    .attr("transform", `translate(${iwidth}, ${-10})`);

// Adds Y Axis
  gDrawing2
    .append("g")
    .call(d3.axisLeft(y2))
    .append("text")
    .style("fill", "black")
    .style("font-size", "10pt")
    .text("Macros (g)")
    .attr("transform", `translate(${50}, -10)`);

  var marks = gDrawing.selectAll(".mark").data(myData);
  var marks2 = gDrawing2.selectAll(".mark").data(myData);

  // Update
  marks  ;
  //TODO change the attribs/style of your updating mark

  var calsline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.cals); })

  // Newly created elements
  marks.enter()
    .append("path")
    .data([myData])
    .attr("class", "line1 line") //CHANGED
    .attr("d", calsline)
    .style("stroke", color("calories")); //CHANGED
    //.style("stroke", "#9C755F");

  // marks.append("text")
  //   .attr("transform", "translate(" + (width + 3) + "," + y(data[length].open) + ")")
  //   .attr("dy", ".35em")
  //   .attr("text-anchor", "start")
  //   .style("fill", "red")
  //   .text("Calories");

// //hover interaction
//     .on("mouseover", function(data, index) {
//       d3.select(this).style("fill", "#696969");
//
//       marks2
//         .filter(function(d, i) {
//           return i === index
//         })
//         .style("fill", "#696969");
//       })
//       .on("mousemove", function(data, index) {})
//       .on("mouseout", function(data, index) {
//         d3.selectAll(".mark").style("fill", "#e4e4e4");
//       })

  var fatline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y2(d.fat); })

  marks2.enter()
    .append("path")
    .data([myData])
    .attr("class", "line2 line") //CHANGED
    .attr("d", fatline)
    .style("stroke", function(){
      console.log("fattt");
       console.log(color("fat"));
       return color("fat");
     }); //CHANGED
    //.style("stroke", "#9467BD");

// //hover interaction
//     .on("mouseover", function(data, index) {
//       d3.select(this).style("fill", "#696969");
//
//       marks
//         .filter(function(d, i) {
//           return i === index
//         })
//         .style("fill", "#696969");
//       })
//       .on("mousemove", function(data, index) {})
//       .on("mouseout", function(data, index) {
//         d3.selectAll(".mark").style("fill", "#e4e4e4");
//       })

  var carbline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y2(d.carbs); })

  marks2.enter()
    .append("path")
    .data([myData])
    .attr("class", "line2 line") //CHANGED
    .attr("d", carbline)
    .style("stroke", color("carbs")); //CHANGED
    //.style("stroke", "#80B1D3");

  var proteinline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y2(d.protein); })

  marks2.enter()
    .append("path")
    .data([myData])
    //.style("stroke", "#FA8072")  
    .style("stroke", color("protein")) //CHANGED
    .attr("class", "line2 line") //CHANGED
    .attr("d", proteinline);

// add text labels to macros chart ///////////////////////////////////////////////
  /*gDrawing2.append("g")
    .classed("labels-group", true)
    .selectAll("text")
    .data([myData])
    .enter()
    .append("text")
    .classed("label", true)
    .attr({
      'x': function(d, i) {
        return x(d.date);
      },
      'y': function(d, i) {
        return y2(d.fat);
      }
    });*/
    // .text(function(d, i) {
    //   return d.fat;
    // });

  gDrawing2.append("text")
    //.attr("transform", "translate(" + (iwidth + 3) + "," + y(myData[0].protein) + ")")
    .attr("transform", "translate(" + (iwidth + 3) + "," + (iheight- 200) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", color("protein"))
    .text("Protein");

  gDrawing2.append("text")
    .attr("transform", "translate(" + (iwidth + 3) + "," + (iheight - 300) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", color("carbs"))
    .text("Carbs");

  gDrawing2.append("text")
    .attr("transform", "translate(" + (iwidth + 3) + "," + (iheight - 100) + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", color("fat"))
    .text("Fat");

/////////
//attempt to hover on calorie chart ///////
/////////

  var focus = gDrawing.append("g")
    .attr("class", "focus")
    .style("display", "none");

  focus.append("circle")
    .attr("r", 5);

  focus.append("rect")
    .attr("class", "tooltip")
    .attr("width", 100)
    .attr("height", 50)
    .attr("x", 10)
    .attr("y", -22)
    .attr("rx", 4)
    .attr("ry", 4);

  focus.append("text")
    .attr("class", "tooltip-date")
    .attr("x", 18)
    .attr("y", -2);

  focus.append("text")
    .attr("x", 18)
    .attr("y", 18)
    .text("Calories:");

  focus.append("text")
    .attr("class", "tooltip-likes")
    .attr("x", 60)
    .attr("y", 18);

// tooltip hover
  marks.append("rect")
    .attr("class", "overlay")
    .attr("width", 30)
    .attr("height", 30)
    .on("mouseover", function() { focus.style("display", null); })
    .on("mouseout", function() { focus.style("display", "none"); })
    .on("mousemove", mousemove);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(myData, x0, 1),
        d0 = myData[i - 1],
        d1 = myData[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.cals) + ")");
    focus.select(".tooltip-date").text(dateFormatter(d.date));
    focus.select(".tooltip-likes").text(formatValue(d.cals));
}
/////////
//attempt to straight line on macros chart ////////////////////////////////////
/////////
  var mouseG = gDrawing2.append("g")
    .attr("class", "mouse-over-effects");

  mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");

  var nutritionLines = document.getElementsByClassName('line2'); //CHANGED
  //var caloryLines = document.getElementsByClassName('line1'); //CHANGED
  //var lines = document.getElementsByClassName('line');
  //console.log("got lines");
  //console.log(lines[0]);
  //console.log(lines[1]);
  //console.log(lines[2]);

  var mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(nutrition_categories)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

  mousePerLine.append("circle")
    .attr("r", 7)
    .style("fill", function(d) {
       return color(d);
     }) //CHANGED
    //.style("fill", "black")
    .style("stroke-width", "1px")
    .style("opacity", 1);

  mousePerLine.append("text")
    .attr("transform", "translate(10,3)");

  mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width) // can't catch mouse events on a g element
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line, circles and text
      d3.select(".mouse-line")
        .style("opacity", "0");
      d3.selectAll(".mouse-per-line circle")
        .style("opacity", "0");
      d3.selectAll(".mouse-per-line text")
        .style("opacity", "0");
      })
    .on('mouseover', function() { // on mouse in show line, circles and text
      d3.select(".mouse-line")
        .style("opacity", "1");
      d3.selectAll(".mouse-per-line circle")
        .style("opacity", "1");
      d3.selectAll(".mouse-per-line text")
        .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
      var mouse = d3.mouse(this);
      d3.select(".mouse-line")
        .attr("d", function() {
          var d = "M" + mouse[0] + "," + height;
          d += " " + mouse[0] + "," + 0;
          return d;
        });

      d3.selectAll(".mouse-per-line")
        .attr("transform", function(d, i) { // add i less than 4?
           lines = nutritionLines;
          /*if(d == "calories")
            lines = caloryLines;
          else
            lines = nutritionLines;*/

          ////console.log(width/mouse[0]);
          var xDate = x.invert(mouse[0]);
              //bisect = d3.bisector(function(d) { return d.date; }).right;
              //idx = bisect(d.cals, xDate);

          var beginning = 0,
              end = lines[i].getTotalLength(),
              target = null;

          while (true){
            target = Math.floor((beginning + end) / 2);
            pos = lines[i].getPointAtLength(target);
            // pos = calsline[i].getPointAtLength(target);
            if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                break;
            }
            if (pos.x > mouse[0])      end = target;
            else if (pos.x < mouse[0]) beginning = target;
            else break; //position found
          }

          d3.select(this).select('text')
            .text(d+ "=" + y2.invert(pos.y).toFixed(2)); //CHANGED to y2

          return "translate(" + mouse[0] + "," + pos.y +")";
        });






// //attempt to focus
//   var focus = marks.append("g")
//     .attr("class", "focus")
//     .style("display", "none");
//
//     focus.append("circle")
//       .attr("r", 4.5);
//
//     focus.append("circle")
//       .attr("r", 4.5);
//
//     var bisectDate = d3.bisector(function(d) {
//       return d.date;
//     }).left;
//
//     focus.append("text")
//       .attr("x", 9)
//       .attr("dy", ".35em");
//
//   marks.append("rect")
//     .attr("class", "overlay")
//     .attr("width", width)
//     .attr("height", height)
//     .on("mouseover", function() {
//       var thisFocus = d3.select(d3.select(this)[0][0].parentNode).select(".focus");
//       thisFocus.style("display", null);
//     })
//     .on("mouseout", function() {
//       var thisFocus = d3.select(d3.select(this)[0][0].parentNode).select(".focus");
//       thisFocus.style("display", "none");
//     })
//     .on("mousemove", mousemoveOpen);
//
//   function mousemoveOpen() {
//     var x0 = x.invert(d3.mouse(this)[0]),
//       i = bisectDate(data, x0, 1),
//       d0 = data[i - 1],
//       d1 = data[i],
//       d = x0 - d0.date > d1.date - x0 ? d1 : d0;
//     var thisFocus = d3.select(d3.select(this)[0][0].parentNode).select(".focus");
//     thisFocus.attr("transform", "translate(" + x(d.date) + "," + y(d.cals) + ")");
//     thisFocus.select("text").text(d.cals);
//   }
// might be trash
  var dots = gDrawing.selectAll(".dot").data(myData)

  dots ;

  dots.enter()
    .append("circle")
    .data([myData])
    .attr("class", "dot")
    .attr("cx", function(d, i) { return x(i) })
    //.attr("cy", function(d) { return y(d.cals) })
    .attr("r", 5);

  // Elements to remove
  // marks.exit().remove();
});
}
d3.csv("data/nutrition_simple.csv", update);
