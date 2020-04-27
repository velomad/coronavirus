import React from "react";
import "../../index.css";
import { connect } from "react-redux";

const TestedSamples = (props) => {
  var Obj = props.tested;

  var bar = [];
  var lastElement;
  var last;
  for (lastElement in Obj) {
    last = Obj[lastElement];
    bar.push(last.totalindividualstested);
  }
  const tested = bar.slice(-1)[0];

  return (
    <div>
      {tested === '' ? '' :
        <p className="tested text-muted rgba-blue-slight">
          '<span className="text-info ">{tested}</span>' Samples are being tested
        till now.
      </p>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tested: state.stats.samples,
  };
};

export default connect(mapStateToProps)(TestedSamples);
