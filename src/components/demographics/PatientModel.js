import React, { useState } from 'react';



const PatientModel = (props) => {

    // let newArry
    // newArry = props.patientData[props.patientNumber - 1]

    return (
        <div>
            <div className="modal fade" id="modalPush" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-notify modal-info" role="document">
                    <div className="modal-content text-center">
                        <div className="modal-header d-flex justify-content-center">
                            <p className="heading">Patient Number : {props.patientNumber}</p>
                        </div>

                        <div className="modal-body">
                            {/* patient details here */}
                            {/* <p>Detected City : {newArry.detectedcity}</p> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PatientModel