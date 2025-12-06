d3.json("./Data/scatter_data.json").then(
    function(data) {
        var points = data['points']

        var margin = {
            top: 30,
            bottom: 30,
            right: 30,
            left: 60
        }

        var box = d3.select("#scatter-box")

        var rect = box.node().getBoundingClientRect()
        console.log(rect)

        var svg = d3.select("#scatter")
                    .style("width", rect.width)
                    .style("height", rect.height)

        var maxHeight = d3.max(points, d => d.height)

        var minTemp = d3.min(points, d => d.temp)
        var maxTemp = d3.max(points, d => d.temp)

        var xScale = d3.scaleLinear()
                       .domain([-1, maxHeight])
                       .range([margin.left, rect.width - margin.right])

        var yScale = d3.scaleLinear()
                    .domain([minTemp-1, maxTemp+1])
                    .range([rect.height - margin.bottom, margin.top])

        const colors = {
            "atlanta"    : "#00fff3",
            "birmingham" : "#61e89f",
            "charleston" : "#9dca4c",
            "greensboro" : "#cea200",
            "nashville"  : "#f36b1e",
            "newbern"    : "#ff0058"
        }
        
        // Drawing the scatterplot
        const scatterplot = svg.selectAll("circle")
            .data(points)
            .join("circle")
            .attr("cx", d => xScale(d.height))
            .attr("cy", d => yScale(d.temp))
            .attr("r", 3)
            .attr("fill", d => colors[d.city])
            .attr("opacity", 0.5)
            // .style("cursor", "pointer")
            // .on("click", handlePointClick);

        var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${yScale(0)}px)`)

        var yAxisGen = d3.axisLeft().scale(yScale)
        var yAxis = svg.append("g")
                        .call(yAxisGen)
                        .style("transform", `translateX(${margin.left}px)`)

        svg.append("text")
           .attr("text-anchor", "middle")
           .attr("x", rect.width/2)
           .attr("y", 15)
           .text("Temperature by Height")

        svg.append("text")
           .attr("text-anchor", "end")
           .attr("x", rect.width - 20)
           .attr("y", yScale(0) + 40)
           .text("Height (km)")

        svg.append("text")
           .attr("text-anchor", "end")
           .attr("x", -100)
           .attr("y", 20)
           .attr("transform", "rotate(-90)")
           .text("Temperature (C)");
    }
)