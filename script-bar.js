d3.json("./Data/bar_data.json").then(
    function(data) {
        var bars = data['bars']

        var margin = {
            top: 40,
            bottom: 40,
            right: 30,
            left: 70
        }

        const colors = {
            "atlanta"    : "#00fff3",
            "birmingham" : "#61e89f",
            "charleston" : "#9dca4c",
            "greensboro" : "#cea200",
            "nashville"  : "#f36b1e",
            "newbern"    : "#ff0058"
        }

        var cities = Object.keys(colors);
        var months = ["aug", "sep", "oct", "nov"];

        xPos = (city, month) => (6*cities.indexOf(city) + months.indexOf(month))
        maxPos = xPos(cities[cities.length-1], months[months.length-1])

        var box = d3.select("#bar-box")
        var rect = box.node().getBoundingClientRect()

        var bandwidth = 0.8*(rect.width-margin.left) / maxPos;

        var svg = d3.select("#bar")
                    .style("width", rect.width)
                    .style("height", rect.height)

        const xBar = d3.scaleLinear()
                       .domain([0, maxPos])
                       .range([margin.left, rect.width - margin.right]);

        const yBar = d3.scaleLinear()
                       .domain([0, d3.max(bars, d => d.humidity)])
                       .range([rect.height - margin.bottom, margin.top]);

        const bar = svg.selectAll("rect")
                          .data(bars)
                          .join("rect")
                          .attr("x", d => xBar(xPos(d.city, d.month)) - bandwidth/2)
                          .attr("y", d => yBar(d.humidity))
                          .attr("width", bandwidth)
                          .attr("height", d => rect.height - margin.bottom - yBar(d.humidity))
                          .attr("fill", d => colors[d.city])
                          .style("cursor", "pointer")
                        //   .on("click", handleBarClick);

        svg.selectAll("text")
           .data(bars)
           .join("text")
           .attr("x", -rect.height+margin.bottom-20)
           .attr("y", d => xBar(xPos(d.city, d.month)) + bandwidth/4)
           .attr("text-anchor", "middle")
           .attr("transform", "rotate(-90)")
           .attr("font-size", "1vw")
           .attr("font-weight", "normal")
           .text(d => d.month);

        var xAxisGen = d3.axisBottom()
                         .scale(xBar)
                         .tickFormat("")
                         .tickSize(0)
                        
        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${rect.height-margin.bottom}px)`)

        var yAxisGen = d3.axisLeft().scale(yBar).ticks(5)
        var yAxis = svg.append("g")
                        .call(yAxisGen)
                        .style("transform", `translateX(${margin.left-20}px)`)

        var title = svg.append("text")
                       .attr("text-anchor", "middle")
                       .attr("x", rect.width/2)
                       .attr("y", 20)
                       .attr("font-size", "1vw")
                       .text("Relative Humidity over Time")

        var yLabel = svg.append("text")
                        .attr("text-anchor", "middle")
                        .attr("x", -rect.height/2)
                        .attr("y", 20)
                        .attr("font-size", "1vw")
                        .attr("transform", "rotate(-90)")
                        .text("Relative Humidity (%)");
    }
)