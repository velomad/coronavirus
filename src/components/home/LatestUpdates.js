import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../index.css';

const LatestUpdates = (props) => {
  const [latestUpdates, setLatestUpdates] = useState(false);


  var test
  test = localStorage.getItem('dark-mode')

  return (
    <div>
      <div>
        <p onClick={() => setLatestUpdates(!latestUpdates)} className="updates">
          <span className="badge badge-info notification"> {props.getLatestUpdates.length} </span>
					{latestUpdates ? <i className="mt-1 far fa-bell-slash"></i> : <i className="mt-1 far fa-bell"></i>}
        </p>
      </div>

      {latestUpdates && (

        <div className="row">
          <div className="latest-updates col-md-6">
            {props.getLatestUpdates
              .slice(0, -1)
              .map((item, index) => (

                <div key={index} >
                  <div className={` ${props.modeState && 'dark-body'} note note-info mt-3`} >
                    <p className={`${test === true ? 'rgba-red-slight' : 'rgba-black-slight'}  `} style={{ padding: "10px", borderRadius: "10px", fontStyle: "Italic", fontWeight: "600" }}><span className="badge badge-danger">{index + 1}</span> Title : {item.title}</p>
                    <p>{item.excerpt}</p>
                    <p >Published At : {new Date(item.publishedDateTime).toDateString()}</p>
                  </div>
                </div>
              ))}
          </div>
          <div>
            {/* something cool in the near future */}
          </div>
        </div>
      )}
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
