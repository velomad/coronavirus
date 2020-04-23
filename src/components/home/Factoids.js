import React, { useState } from "react";
import { connect } from "react-redux";

let factArr = [];

const Factoids = (props) => {
  const [msgs, setMsgs] = useState([
    "Don't hoard groceries and essentials. Please ensure that people who are in need don't face a shortage because of you!",
    "Be compassionate! Help those in need like the elderly and poor. They are facing a crisis which we can't even imagine!",
    "Be considerate. While buying essentials remember that you need to share with 130 crore fellow citizens!",
    "Going out to buy essentials? Social Distancing is KEY! Maintain at least 2 metres distance between each other in the line.",
    "Panic mode : OFF! ❌\nESSENTIALS ARE ON! ✔️",
    "Our brothers from the North-East are just as Indian as you! Help everyone during this crisis ❤️",
  ]);
  const [displayMsg, setDisplayMsg] = useState("Stay Home, Stay Happy");

  props.factoidsData.forEach((element) => {
    factArr.push(element.banner);
    factArr.slice(0, 10);
  });

//   msgs.forEach((item, index) => {
//     setInterval(() => {
//       setDisplayMsg(item);
//     }, 2000 * (index + 1));
//   });

  return (
    <div className="d-flex justify-content-center mt-3">
      <p>{displayMsg}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    factoidsData: state.stats.factoids,
  };
};

export default connect(mapStateToProps)(Factoids);
