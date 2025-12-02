d3.json("Data/scatter_data.json").then(
    function(data) {
        var points = data['points']
        var line = data['line']

        var svg = d3.select("#scatter")
            .style("width", 800)
            .style("height", 600)
        
        // Drawing the scatterplot
        const scatterplot = svg.selectAll("circle")
            .data(points)
            .join("circle")
            .attr("cx", d => 50+20*d.height)
            .attr("cy", d => 100-5*d.temp)
            .attr("r", 5)
            // .attr("fill", d => colorByCategory(d.category))
            .attr("opacity", 0.5)
            // .style("cursor", "pointer")
            // .on("click", handlePointClick);
    }
)