import React, { useEffect } from 'react';
import BoxMessage from './BoxMessage';
import PatientHeatMap from './PatientHeatMap';
import { connect } from 'react-redux';
import { getPatientData } from '../../store/actions/patientActions';
import SelectOptions from './SelectOptions';


const Demographics = (props) => {

    useEffect(() => {
        props.getPatient()
    })

    return (
        <div className="container">

            <div className="mt-2">
                <SelectOptions />
            </div>

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