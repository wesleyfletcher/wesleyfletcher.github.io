function handleHover(city=null, month=null, height=null) {
    if (city == null && month == null) {
        d3.select("#bar").selectAll("rect")
            .attr("opacity", 1);

        d3.select("#scatter").selectAll("circle")
            .attr("opacity", 0.5)
            .attr("stroke", "none")

        d3.select("#line").selectAll(".line")
            .attr("opacity", 1)

        d3.select("#line").selectAll("circle")
            .attr("opacity", 1)
            .attr("stroke", "none")

    } else if (city == null) {
        d3.select("#bar").selectAll("rect")
            .attr("opacity", d => (d.month == month ? 1 : 0.1))

        d3.select("#scatter").selectAll("circle")
            .attr("opacity", d => (d.month == month ? 0.8 : 0.1))
            .attr("stroke", d => (d.month == month ? "#1c4857" : "none"))

        d3.select("#line").selectAll(".line")
            .attr("opacity", 0.1)

        d3.select("#line").selectAll("circle")
            .attr("opacity", d => (d.month == month ? 1 : 0.1))
            .attr("stroke", d => (d.month == month ? "#1c4857" : "none"))

    } else if (month == null) {
        d3.select("#bar").selectAll("rect")
            .attr("opacity", d => (d.city == city ? 1 : 0.1))

        d3.select("#scatter").selectAll("circle")
            .attr("opacity", d => (d.city == city ? 0.8 : 0.1))
            .attr("stroke", d => (d.city == city ? "#1c4857" : "none"))

        d3.select("#line").selectAll(".line")
            .attr("opacity", d => (d.city == city ? 1 : 0.1))

        d3.select("#line").selectAll("circle")
            .attr("opacity", d => (d.city == city ? 1 : 0.1))
            .attr("stroke", d => (d.city == city ? "#1c4857" : "none"))

    } else {
        d3.select("#bar").selectAll("rect")
            .attr("opacity", d => ((d.city == city && d.month == month) ? 1 : 0.1))

        if (height != null) {
            d3.select("#scatter").selectAll("circle")
            .attr("opacity", d => ((d.city == city && d.month == month && d.height == height) ? 0.8 : 0.1))
            .attr("stroke", d => ((d.city == city && d.month == month && d.height == height) ? "#1c4857" : "none"))
        } else {
            d3.select("#scatter").selectAll("circle")
            .attr("opacity", d => ((d.city == city && d.month == month) ? 0.8 : 0.1))
            .attr("stroke", d => ((d.city == city && d.month == month) ? "#1c4857" : "none"))
        }

        d3.select("#line").selectAll(".line")
            .attr("opacity", 0.1)

        d3.select("#line").selectAll("circle")
            .attr("opacity", d => ((d.city == city && d.month == month) ? 1 : 0.1))
            .attr("stroke", d => ((d.city == city && d.month == month) ? "#1c4857" : "none"))
    }
}

// function handleClick(month) {
    
// }

var cityCase = {
    "Atlanta, GA" : "atlanta",
    "Birmingham, AL" : "birmingham",
    "Charleston, SC" : "charleston",
    "Greensboro, NC" : "greensboro",
    "Nashville, TN" : "nashville",
    "New Bern, NC" : "newbern"
}

var monthCase = {
    "August" : "aug",
    "September" : "sep",
    "October" : "oct",
    "November" : "nov"
}

d3.selectAll("#city-filter button")
    .on("mouseover", function() {
        let city = cityCase[d3.select(this).text()];
        handleHover(city);
    });
d3.selectAll("#month-filter button")
    .on("mouseover", function() {
        let month = monthCase[d3.select(this).text()];
        handleHover(null, month);
    });
d3.selectAll("button")
    .on("mouseout", function() {
        handleHover();
    });
// d3.selectAll("#month-filter button")
//     .on("click", function() {
//         let month = monthCase[d3.select(this).text()];
//         handleClick(month);
//     });