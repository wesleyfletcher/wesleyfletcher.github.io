d3.json("./Data/line_data.json").then(
    function(data) {
        var line = data['line']
        var margin = {
            top: 30,
            bottom: 60,
            right: 30,
            left: 60
        }

        var box = d3.select("#line-box")
        var rect = box.node().getBoundingClientRect()

        var svg = d3.select("#line")

        var minTemp = d3.min(line, d => d.temp)
        var maxTemp = d3.max(line, d => d.temp)

        var xLeft = margin.left + 10
        var xRight = rect.width - margin.right - 10

        var xScale = d3.scaleOrdinal()
                       .domain(["aug", "sep", "oct", "nov"])

        var yScale = d3.scaleLinear()
                       .domain([minTemp-1, maxTemp+1])

        const colors = {
            "atlanta"    : "#00fff3",
            "birmingham" : "#61e89f",
            "charleston" : "#9dca4c",
            "greensboro" : "#cea200",
            "nashville"  : "#f36b1e",
            "newbern"    : "#ff0058"
        }

        const cities = Array.from(
            d3.group(line, d => d.city),
            ([key, values]) => ({
                city: key,
                values: values
            })
        )

        svg.selectAll(".line")
            .data(cities)
            .join("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", d => colors[d.city])
            .attr("stroke-width", 2)
        
        svg.selectAll("circle")
            .data(line)
            .join("circle")
            .attr("id", d => (d.city + " " + d.month))
            .attr("r", 5)
            .attr("fill", d => colors[d.city])
            .style("cursor", "pointer")

        var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")

        var yAxisGen = d3.axisLeft().scale(yScale)
        var yAxis = svg.append("g")

        var title = svg.append("text")
                       .attr("text-anchor", "middle")
                       .attr("y", 30)
                       .attr("font-size", "1vw")
                       .text("Temperature by Month")

        var xLabel = svg.append("text")
                        .attr("text-anchor", "middle")
                        .attr("font-size", "1vw")
                        .text("Month")

        var yLabel = svg.append("text")
                        .attr("text-anchor", "end")
                        .attr("y", 20)
                        .attr("font-size", "1vw")
                        .attr("transform", "rotate(-90)")
                        .text("Temperature (C)");

        function resizeLine() {
            var rect = box.node().getBoundingClientRect()
            
            svg.attr("width", rect.width)
               .attr("height", rect.height)

            xRight = rect.width - margin.right - 10
            xScale.range([xLeft, (2*xLeft+xRight)/3, (xLeft+2*xRight)/3, xRight])
            yScale.range([rect.height - margin.bottom, margin.top])

            var lineGen = d3.line()
                            .x(d => xScale(d.month))
                            .y(d => yScale(d.temp));

            svg.selectAll(".line")
               .attr("d", d => lineGen(d.values))

            svg.selectAll("circle")
               .attr("cx", d => xScale(d.month))
               .attr("cy", d => yScale(d.temp))

            xAxis.call(xAxisGen)
                 .style("transform", `translateY(${rect.height-margin.bottom}px)`)

            yAxis.call(yAxisGen)
                 .style("transform", `translateX(${margin.left}px)`)

            title.attr("x", rect.width/2)
            xLabel.attr("x", rect.width/2+20)
                  .attr("y", rect.height-25)
            yLabel.attr("x", -rect.height/3)
        };

        window.addEventListener("resize", resizeLine);
        resizeLine();

        d3.selectAll("circle")
        .on("mouseover", function() {
            const input = d3.select(this).attr("id").split(" ")
            handleHover(city=input[0], month=input[1]);
        })
        .on('mouseout', function(){
            handleHover();
        });
    }
)