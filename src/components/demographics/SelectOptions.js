import React, { useEffect, useState } from 'react';
import './demographics.css'
import { connect } from 'react-redux';
import { getStatesAction } from '../../store/actions/patientActions';

const SelectOptions = (props) => {
const [stateSelect, setStateSelect] = useState('')

    useEffect(() => {
        props.getStates()
    }, [])

    return (
        <div className="container">
            <div className="row select-option">
                <select
                    onChange={(event) => setStateSelect(event.target.value)}
                    value={stateSelect}
                    className=" btn btn-outline-primary dropdown-toggle"
                >
                    <option Value="" disabled>--Select State--</option>
                    <option value="all">All</option>
                    {props.allStatesData.sort().map((state, index) => (
                        <option key={index} Value={state.state}>{state.state}</option>
                    ))}
                </select>


                {stateSelect && stateSelect !== 'all' ?
                    <select
                        className="  btn btn-outline-primary dropdown-toggle"
                    >
                        <option value="">--Select District--</option>
                        <option value="genderwise">Gender Wise Data</option>
                        <option value="currentstatus">Current Status</option>
                        <option value="transmissiontype">Type of Transmission</option>
                    </select>
                    : ''}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allStatesData: state.patient.getStatesData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStates: () => dispatch(getStatesAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectOptions)