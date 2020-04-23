import React from "react";
import "./livestats.css";

const LiveStats = (props) => {
  return (
    <div>
      <div className="card mt-4 view overlay">
        <div
          className={`card-body card-settings rgba-${props.hoverColor}-slight`}
        >
          <div className="container row">
            <h3
              className={`card-title ${props.badgeColor}`}
              style={{ fontSize: "20px" }}
            >
              {props.name}
            </h3>
            <h3
              className={`${props.textColor} ml-auto`}
              style={{ fontSize: "20px", fontWeight: 700 }}
            >
              {props.count}
            </h3>
          </div>
          {props.activegraph}

          {/* CR for new delta cases */}
          {props.todayCount  <=0 ? (
            <p className={props.textColor}>No new cases yet</p>
          ) : (
            <div className="container row">
              <h3
                className={`${props.textColor} card-title`}
                style={{ fontSize: "20px" }}
              >
                <i className="far fa-arrow-alt-circle-up cc_pointer text-small"></i>
              </h3>

              <h3
                className={`${props.textColor} ml-auto`}
                style={{ fontSize: "20px", fontWeight: 700 }}
              >
                [+{props.todayCount}]
              </h3>
            </div>
          )}

        </div>
        <div
          className={`mask flex-center rgba-${props.hoverColor}-slight`}
        ></div>
      </div>
    </div>
  );
};

export default LiveStats;
