import React from 'react';
import './statestats.css'
import { Link } from 'react-router-dom';

const StateStats = (props) => {
    return (
        <div>

            <div className="container mt-5">

                {window.innerWidth <= 600 ? <p className="text-muted" style={{ textAlign: "center" }}>Tap on the state to get statistics of it.</p> : <p className="text-muted" style={{ textAlign: "center" }}>Hover over the state to get statistics of it.</p>}


                <div className="row">
                    <div className="col stat-box rgba-red-slight">
                        <p className="text-danger">Cnfrm</p>
                        <p className="text-danger">{props.confirmed}</p>
                    </div>
                    <div className="col stat-box rgba-blue-slight">
                        <p className="text-info">Actv</p>
                        <p className="text-info">{props.active}</p>

                    </div>
                    <div className="col stat-box rgba-green-slight">
                        <p className="text-success">Rcvrd</p>
                        <p className="text-success">{props.recovered}</p>

                    </div>
                    <div className="col stat-box rgba-grey-slight">
                        <p className="text-black">Dcsd</p>
                        <p className="text-black">{props.deceased}</p>

                    </div>
                </div>

                <div className="row">

                    {props.lastUpdatedTime && <p className="col-sm-6">Updated on<br />{props.lastUpdatedTime}</p>}

                    <p style={{ fontSize: "18px" }} className="col-sm-6 state-name">{props.stateName}</p>

                </div>

                {props.lastUpdatedTime &&
                    <div>
                        <Link to={`state/${props.stateCode}`}><span className="rgba-orange-slight text-warning" style={{ padding: "10px", borderRadius: "10px", fontWeight: 500 }}>Visit State Page</span></Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default StateStats