import React, { useState } from 'react';
import './demographics.css'
import { connect } from 'react-redux';
import PatientModel from './PatientModel';

const PatientHeatMap = (props) => {
    const [isChecked, setIsChecked] = useState(false)
    const [patientNumber, setPatientNumber] = useState('')


    // expand toggle switch
    const handleToggle = () => {
        setIsChecked(!isChecked)
    }

    return (
        <div className="container">

            <div className="row">
                <h2 className="text-info" style={{fontWeight:600}}>Demographics</h2>
            </div>

            <div className="row">

                <div className="col custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input sizer" id="customSwitch1" onClick={handleToggle} defaultChecked={isChecked} />
                    <label className="custom-control-label" htmlFor="customSwitch1">Expand </label>
                </div>

            </div>

            <div className="row d-flex justify-content-center mt-5">

                {props.patientData.map((patient, index) => (
                    <div
                        // onClick={() => setPatientNumber(patient.patientnumber)}
                        // data-toggle="modal" data-target="#modalPush"
                        key={index}
                        className={`expanded-patient-box ${patient.gender === "F" ? 'pink lighten-1' : patient.gender === "M" ? 'blue lighten-1' : 'grey lighten-2'}`}>

                        {isChecked ?
                            <p
                                className="text-muted"
                                style={{
                                    width: isChecked && "60px",
                                    height: isChecked && "50px",
                                    lineHeight: "60px",
                                    textAlign: "center",
                                }}>
                                P{patient.patientnumber}</p>
                            :
                            <div style={{ width: "20px", height: "20px" }}>
                            </div>
                        }
                    </div>
                ))}
            </div>
            {/* <PatientModel patientNumber={patientNumber} patientData={props.patientData} /> */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        patientData: state.patient.getPatientData
    }
}

export default connect(mapStateToProps)(PatientHeatMap)