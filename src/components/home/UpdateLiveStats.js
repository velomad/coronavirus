import React from "react";
import "../../index.css";

const UpdateLiveStats = (props) => {
  let convertedTime;
  convertedTime = props.lastUpdatedTime;

  return (
    <div>
      <div>
        <p className="text-muted updatedat rgba-green-slight">
          Updated AT {convertedTime}
        </p>
      </div>
    </div>
  );
};

export default UpdateLiveStats;
