import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../index.css';

const LatestUpdates = (props) => {
  const [latestUpdates, setLatestUpdates] = useState(false);


  var test
  test = localStorage.getItem('dark-mode')

  return (
    


          <div className="latest-updates ">
             <p style={{color:"#fff", fontSize:"18px", marginLeft:"5px"}}> News Notifications</p>
            {props.getLatestUpdates
              .slice(0, -1)
              .map((item, index) => (

                <div key={index} >
                  <div className={` ${props.modeState && 'dark-body'} note note-danger mt-2`} >
                    <p className={`${test === true ? 'rgba-red-slight' : 'rgba-black-slight'}  `} style={{ padding: "10px", borderRadius: "10px", fontStyle: "Italic", fontWeight: "600" }}><span className="badge badge-danger">{index + 1}</span> Title : {item.title}</p>
                    <p>{item.excerpt}</p>
                    <p >Published At : {new Date(item.publishedDateTime).toDateString()}</p>
                  </div>
                </div>
              ))}
          </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getLatestUpdates: state.stats.latestUpdates,
    modeState: state.darkMode.hasmode
  };
};

export default connect(mapStateToProps)(LatestUpdates);
