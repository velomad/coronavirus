import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { getLiveStatsAction } from "../../../store/actions/statActions";


const RecoveredMiniGraph = (props) => {
  const [timeseries, setTimeseries] = useState([]);
  const graphElement1 = useRef(null);

  useEffect(() => {
    if (props.timeseries.length > 1) {
      setTimeseries(props.timeseries.slice(props.timeseries.length - 25));
    }
  }, [props.timeseries]);

  const graphData = useCallback(
    (timeseries) => {
      if (timeseries.length <= 1) return 0;
      const data = timeseries;
      const svg3 = d3.select(graphElement1.current);
      const margin = { top: 20, right: 10, bottom: 30, left: 0 };
      const width = 100 - margin.left - margin.right;
      const height = 100 - margin.top - margin.bottom;

      const x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return new Date(d["date"] + "2020");
          })
        )
        .range([0, width]);

      const y1 = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d["dailyconfirmed"];
          }),
        ])
        .range([height, 0]);

      const path3 = svg3
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#28a74599")
        .attr("stroke-width", 2)
        .attr("cursor", "pointer")
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(new Date(d["date"] + "2020"));
            })
            .y(function (d, i) {
              if (i === 0) {
                return y1(d["dailyrecovered"]);
              } else {
                return y1(d["dailyrecovered"]);
              }
            })
            .curve(d3.curveCardinal)
        );

      const totalLength3 = path3.node().getTotalLength();
      path3
        .attr("stroke-dasharray", totalLength3 + " " + totalLength3)
        .attr("stroke-dashoffset", totalLength3)
        .transition()
        .duration(props.animate ? 2000 : 0)
        .attr("stroke-dashoffset", 0);

      svg3
        .selectAll(".dot")
        .data(data.slice(data.length - 1))
        .enter()
        .append("circle")
        .attr("fill", "#28a745")
        .attr("stroke", "#28a745")
        .attr("r", 2)
        .attr("cursor", "pointer")
        .attr("cx", function (d) {
          return x(new Date(d["date"] + "2020"));
        })
        .attr("cy", function (d) {
          return y1(d["dailyrecovered"]);
        })
        .on("mouseover", (d) => {
          d3.select(d3.event.target).attr("r", "5");
        })
        .on("mouseout", (d) => {
          d3.select(d3.event.target).attr("r", "2");
        })
        .style("opacity", 0)
        .transition()
        .duration(props.animate ? 3000 : 0)
        .style("opacity", 1);
    },
    [props.animate]
  );

  useEffect(() => {
    graphData(timeseries);
  }, [timeseries, graphData]);

  return (
    <div className="Minigraph">
      <div className="svg-parent fadeInUp" style={{ animationDelay: "0.6s" }}>
        <svg
          ref={graphElement1}
          width="200"
          height="130"
          viewBox="0 0 100 70"
          preserveAspectRatio="xMidYMid meet"
        />
      </div>

      <div
        className="svg-parent is-blue fadeInUp"
        style={{ animationDelay: "0.7s" }}
      ></div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      timeseries: state.stats.timeSeries,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getLiveStats: () => dispatch(getLiveStatsAction()),
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(RecoveredMiniGraph);