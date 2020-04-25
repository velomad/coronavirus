import axios from "axios"

export const GET_PATIENT_DATA = "GET_PATIENT_FETCH"
export const FETCHING_PATIENT_DATA = "FETCHING_PATIENT_DATA"
export const ERROR_PATIENT_DATA = "ERROR_PATIENT_DATA"
export const GET_STATES = "GET_STATES"
export const FETCHING_STATES = "FETCHING_STATES"
export const ERROR_STATES = "ERROR_STATES"


export const getPatientData = () => {
    return dispatch => {
        dispatch({ type: FETCHING_PATIENT_DATA })
        axios.get('https://api.covid19india.org/raw_data.json').then(resp => {
            dispatch({ type: GET_PATIENT_DATA, payload: resp.data.raw_data.reverse().slice(0, 1640) })
        }).catch(err => {
            console.log(err)
            dispatch({ type: ERROR_PATIENT_DATA, payload: "Error Occured. Try again" })
        })
    }
}


export const getStatesAction = () => {
    return dispatch => {
        dispatch({type:FETCHING_STATES})
        axios.get('https://api.covid19india.org/data.json').then(resp => {
            dispatch({type:GET_STATES, payload:resp.data.statewise.slice(1, -1)})
        }).catch(err => {
            console.log(err)
            dispatch({type:ERROR_STATES, payload:'error fetching states'})
        })
    }
}