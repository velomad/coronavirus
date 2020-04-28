import React, { useState } from 'react';


const PatientModel = (props) => {



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
                            patient details here
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientModel