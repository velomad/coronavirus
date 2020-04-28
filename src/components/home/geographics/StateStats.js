import React from 'react';
import './statestats.css'

const StateStats = (props) => {
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col stat-box rgba-red-slight">
                        <p>Cnfrm</p>
                        <p>{props.confirmed}</p>
                    </div>
                    <div className="col stat-box rgba-blue-slight">
                        <p>Actv</p>
                        <p>{props.confirmed}</p>

                    </div>
                    <div className="col stat-box rgba-green-slight">
                        <p>Rcvrd</p>
                        <p>{props.confirmed}</p>

                    </div>
                    <div className="col stat-box rgba-grey-slight">
                        <p>Dcsd</p>
                        <p>{props.confirmed}</p>

                    </div>
                </div>
                <div className="row">
                    <p style={{fontSize:"18px"}} className="col">{props.stateName}</p>
                    <p>Last Updated At  <br />45645456</p>
                </div>
            </div>
        </div>
    )
}

export default StateStats