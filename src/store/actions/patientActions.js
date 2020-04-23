import axios from "axios"

export const GET_PATIENT_DATA = "GET_PATIENT_FETCH"
export const FETCHING_PATIENT_DATA = "FETCHING_PATIENT_DATA"
export const ERROR_PATIENT_DATA = "ERROR_PATIENT_DATA"

export const getPatientData = () => {
    return dispatch => {
        dispatch({ type: FETCHING_PATIENT_DATA })
        axios.get('https://api.covid19india.org/raw_data.json').then(resp => {
            dispatch({ type: GET_PATIENT_DATA, payload:resp.data.raw_data.reverse().slice(0, 1640) })
        }).catch(err => {
            console.log(err)
            dispatch({ type: ERROR_PATIENT_DATA, payload:"Error Occured. Try again" })
        })
    }
}