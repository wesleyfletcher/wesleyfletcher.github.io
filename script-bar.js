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
        var svg = d3.select("#bar")

        var xBar = d3.scaleLinear()
                       .domain([0, maxPos])
        var yBar = d3.scaleLinear()
                       .domain([0, d3.max(bars, d => d.humidity)])

        svg.selectAll("rect")
           .data(bars)
           .join("rect")
           .attr("id", d => (d.city + " " + d.month))
           .attr("fill", d => colors[d.city])
           .style("cursor", "pointer")

        svg.selectAll("text")
           .data(bars)
           .join("text")
           .attr("class", "barlabel")
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

        var yAxisGen = d3.axisLeft().scale(yBar).ticks(5)
        var yAxis = svg.append("g")

        var title = svg.append("text")
                       .attr("text-anchor", "middle")
                       .attr("y", 20)
                       .attr("font-size", "1vw")
                       .text("Relative Humidity over Time")

        var yLabel = svg.append("text")
                        .attr("text-anchor", "end")
                        .attr("y", 20)
                        .attr("font-size", "1vw")
                        .attr("transform", "rotate(-90)")
                        .text("Relative Humidity (%)");

        function resizeBar() {
            var rect = box.node().getBoundingClientRect()
            
            svg.attr("width", rect.width)
               .attr("height", rect.height)

            var bandwidth = (rect.width-margin.left) / maxPos;
        
            xBar.range([margin.left, rect.width - margin.right]);
            yBar.range([rect.height - margin.bottom, margin.top]);

            svg.selectAll("rect")
                .attr("x", d => xBar(xPos(d.city, d.month)) - bandwidth/2)
                .attr("y", d => yBar(d.humidity))
                .attr("width", 0.9*bandwidth)
                .attr("height", d => rect.height - margin.bottom - yBar(d.humidity) + 0.05*bandwidth)
                .attr("stroke", "#d6d6d6")
                .attr("stroke-width", 0.1*bandwidth);

            svg.selectAll(".barlabel")
                .attr("x", -rect.height+margin.bottom-20)
                .attr("y", d => xBar(xPos(d.city, d.month)) + bandwidth/4);

            xAxis.call(xAxisGen)
                 .style("transform", `translateY(${rect.height-margin.bottom}px)`)

            yAxis.call(yAxisGen)
                 .style("transform", `translateX(${margin.left-20}px)`)

            title.attr("x", rect.width/2)
            yLabel.attr("x", -rect.height/4)
        };

        window.addEventListener("resize", resizeBar);
        resizeBar();

        d3.selectAll("rect")
        .on("mouseover", function() {
            const input = d3.select(this).attr("id").split(" ")
            handleHover(city=input[0], month=input[1]);
        })
        .on('mouseout', function(){
            handleHover();
        })
        .on('click', function(){
        
        })
    }
)