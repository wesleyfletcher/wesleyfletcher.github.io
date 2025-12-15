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

        var svg = d3.select("#scatter")

        var maxHeight = d3.max(points, d => d.height)
        var minTemp = d3.min(points, d => d.temp)
        var maxTemp = d3.max(points, d => d.temp)

        var xScale = d3.scaleLinear()
                       .domain([-1, maxHeight])
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
        
        svg.selectAll("circle")
            .data(points)
            .join("circle")
            .attr("id", d => (d.city + " " + d.month))
            .attr("r", 4)
            .attr("fill", d => colors[d.city])
            .attr("opacity", 0.5)
            .style("cursor", "pointer")

        var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")

        var yAxisGen = d3.axisLeft().scale(yScale)
        var yAxis = svg.append("g")

        var title = svg.append("text")
                       .attr("text-anchor", "middle")
                       .attr("y", 30)
                       .attr("font-size", "1vw")
                       .text("Temperature by Height")

        var xLabel = svg.append("text")
                        .attr("text-anchor", "end")
                        .attr("font-size", "1vw")
                        .text("Height (km)")

        var yLabel = svg.append("text")
                        .attr("text-anchor", "end")
                        .attr("y", 20)
                        .attr("font-size", "1vw")
                        .attr("transform", "rotate(-90)")
                        .text("Temperature (C)");

        function resize_scatter() {
            var rect = box.node().getBoundingClientRect()
            
            svg.attr("width", rect.width)
               .attr("height", rect.height)

            xScale.range([margin.left, rect.width - margin.right])
            yScale.range([rect.height - margin.bottom, margin.top])

            svg.selectAll("circle")
                .attr("cx", d => xScale(d.height))
                .attr("cy", d => yScale(d.temp))

            xAxis.call(xAxisGen)
                 .style("transform", `translateY(${yScale(0)}px)`)

            yAxis.call(yAxisGen)
                 .style("transform", `translateX(${margin.left}px)`)

            title.attr("x", rect.width/2)
            xLabel.attr("x", rect.width - 20)
                  .attr("y", yScale(0) + 40)
            yLabel.attr("x", -rect.height/3)
        };

        window.addEventListener("resize", resize_scatter);
        resize_scatter();

        d3.selectAll("circle").on('mouseover', function(event,d){
            const input = d3.select(this).attr("id").split(" ")
            handleHover(city=input[0], month=input[1], height=d.height);
        })

        d3.selectAll("circle").on('mouseout', function(event){
            handleHover()
        })
    }
)