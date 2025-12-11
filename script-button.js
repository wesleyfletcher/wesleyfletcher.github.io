function handleCityHover(city) {
    if (city == null) {
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
    }
    else {
        d3.select("#bar").selectAll("rect")
            .attr("opacity", d => (d.city == city ? 1 : 0.1));

        d3.select("#scatter").selectAll("circle")
            .attr("opacity", d => (d.city == city ? 0.8 : 0.1))
            .attr("stroke", "#1c4857")

        d3.select("#line").selectAll(".line")
            .attr("opacity", d => (d.city == city ? 1 : 0.1))

        d3.select("#line").selectAll("circle")
            .attr("opacity", d => (d.city == city ? 1 : 0.1))
            .attr("stroke", "#1c4857")
    }
}

function handleMonthHover(month) {
    if (month == null) {
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
    }
    else {
        d3.select("#bar").selectAll("rect")
            .attr("opacity", d => (d.month == month ? 1 : 0.1));

        d3.select("#scatter").selectAll("circle")
            .attr("opacity", d => (d.month == month ? 0.8 : 0.1))
            .attr("stroke", "#1c4857")

        d3.select("#line").selectAll(".line")
            .attr("opacity", 0.1)

        d3.select("#line").selectAll("circle")
            .attr("opacity", d => (d.month == month ? 1 : 0.1))
            .attr("stroke", "#1c4857")
    }
}

var cityCase = {
    "Atlanta, GA" : "atlanta",
    "Birmingham, AL" : "birmingham",
    "Charleston, SC" : "charleston",
    "Greensboro, NC" : "greensboro",
    "Nashville, TN" : "nashville",
    "New Bern, NC" : "newbern"
}

d3.selectAll("#city-filter button")
    .on("mouseover", function(event, d) {
        let city = cityCase[d3.select(this).text()];
        handleCityHover(city);
    });
d3.selectAll("#city-filter button")
    .on("mouseout", function() {
        handleCityHover(null);
    });

var monthCase = {
    "August" : "aug",
    "September" : "sep",
    "October" : "oct",
    "November" : "nov"
}

d3.selectAll("#month-filter button")
    .on("mouseover", function(event, d) {
        let month = monthCase[d3.select(this).text()];
        handleMonthHover(month);
    });
d3.selectAll("#month-filter button")
    .on("mouseout", function() {
        handleMonthHover(null);
    });