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
            .attr("stroke", d => (d.month == month ? "#1c4587" : "none"))

        d3.select("#line").selectAll(".line")
            .attr("opacity", 0.1)

        d3.select("#line").selectAll("circle")
            .attr("opacity", d => (d.month == month ? 1 : 0.1))
            .attr("stroke", d => (d.month == month ? "#1c4587" : "none"))

    } else if (month == null) {
        d3.select("#bar").selectAll("rect")
            .attr("opacity", d => (d.city == city ? 1 : 0.1))

        d3.select("#scatter").selectAll("circle")
            .attr("opacity", d => (d.city == city ? 0.8 : 0.1))
            .attr("stroke", d => (d.city == city ? "#1c4587" : "none"))

        d3.select("#line").selectAll(".line")
            .attr("opacity", d => (d.city == city ? 1 : 0.1))

        d3.select("#line").selectAll("circle")
            .attr("opacity", d => (d.city == city ? 1 : 0.1))
            .attr("stroke", d => (d.city == city ? "#1c4587" : "none"))

    } else {
        d3.select("#bar").selectAll("rect")
            .attr("opacity", d => ((d.city == city && d.month == month) ? 1 : 0.1))

        if (height != null) {
            d3.select("#scatter").selectAll("circle")
            .attr("opacity", d => ((d.city == city && d.month == month && d.height == height) ? 0.8 : 0.1))
            .attr("stroke", d => ((d.city == city && d.month == month && d.height == height) ? "#1c4587" : "none"))
        } else {
            d3.select("#scatter").selectAll("circle")
            .attr("opacity", d => ((d.city == city && d.month == month) ? 0.8 : 0.1))
            .attr("stroke", d => ((d.city == city && d.month == month) ? "#1c4587" : "none"))
        }

        d3.select("#line").selectAll(".line")
            .attr("opacity", 0.1)

        d3.select("#line").selectAll("circle")
            .attr("opacity", d => ((d.city == city && d.month == month) ? 1 : 0.1))
            .attr("stroke", d => ((d.city == city && d.month == month) ? "#1c4587" : "none"))
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

var monthCase = {
    "August" : "aug",
    "September" : "sep",
    "October" : "oct",
    "November" : "nov"
}

monthClicked = null;

d3.selectAll("#city-filter button")
    .on("mouseover", function() {
        d3.select(this)
          .style("transition", "background-color 0.5s")
          .style("background-color", "#1c4587")

        let city = cityCase[d3.select(this).text()];
        handleHover(city);
    })
    .on("mouseout", function() {
        d3.select(this)
              .style("transition", "background-color 0.5s")
              .style("background-color", "inherit")

        handleHover();
    });

d3.selectAll("#month-filter button")
    .on("mouseover", function() {
        d3.select(this)
          .style("transition", "background-color 0.5s")
          .style("background-color", "#1c4587")

        if (monthClicked == null) {
            let month = monthCase[d3.select(this).text()];
            handleHover(null, month);
        }
    })
    .on("mouseout", function() {
        let month = monthCase[d3.select(this).text()];
        if (monthClicked != month) {
            d3.select(this)
              .style("transition", "background-color 0.5s")
              .style("background-color", "inherit")
        }
        if (monthClicked == null) {
            handleHover();
        }
    })
    .on("click", function() {
        let month = monthCase[d3.select(this).text()];

        if (monthClicked == null) {
            monthClicked = month;

            d3.select(this)
              .style("transition", "background-color 0.5s")
              .style("background-color", "#1c4587")
        }
        else if (monthClicked != month) {
            monthClicked = month;

            d3.selectAll("#month-filter button")
              .style("background-color", "inherit")
            d3.select(this)
              .style("background-color", "#1c4587")

            handleHover(null, month);
        }
        else {
            monthClicked = null;

            d3.select(this)
              .style("background-color", "inherit")

            handleHover();
        }
    });