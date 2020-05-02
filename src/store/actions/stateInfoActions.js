import Axios from "axios"

export const GET_STATES_DATA = "GET_STATES_DATA"


export const stateInfoAction = () => {
    return dispatch => {
        Axios.get('https://api.covid19india.org/data.json').then(resp => {
            dispatch({ type: GET_STATES_DATA, payload: resp.data.statewise.slice(1, -1) })
        }).catch(err => {
            console.log(err)
        })
    }
}