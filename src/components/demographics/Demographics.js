import React, { useEffect } from 'react';
import BoxMessage from './BoxMessage';
import PatientHeatMap from './PatientHeatMap';
import { connect } from 'react-redux';
import { getPatientData } from '../../store/actions/patientActions';


const Demographics = (props) => {

    useEffect(() => {
        props.getPatient()
    })

    return (
        <div className="container">
            <p>select options for states district and also the calander</p>

            <div>
                <BoxMessage />
            </div>


            <div className="mt-5">
                <PatientHeatMap />
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getPatient: () => dispatch(getPatientData())
    }
}


export default connect(null, mapDispatchToProps)(Demographics)