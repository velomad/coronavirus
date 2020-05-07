import Axios from "axios"

export const GET_STATES_DATA = "GET_STATES_DATA"
export const GET_DISTRICT_DATA = "GET_DISTRICT_DATA"
export const GET_ZONE_DATA = "GET_ZONE_DATA"
export const GET_TESTED_DATA = "GET_TESTED_DATA"


export const stateInfoAction = () => {
    return dispatch => {
        Axios.get('https://api.covid19india.org/data.json').then(resp => {
            dispatch({ type: GET_STATES_DATA, payload: resp.data.statewise.slice(1, -1) })
        }).catch(err => {
            console.log(err)
        })
    }
}

export const districtInfoAction = () => {
    return dispatch => {
        Axios.get('https://api.covid19india.org/v2/state_district_wise.json').then(resp => {
            dispatch({ type: GET_DISTRICT_DATA, payload: resp.data })
        }).catch(err => {
            console.log(err)
        })
    }
}

export const zoneInfoAction = () => {
    return dispatch => {
        Axios.get('https://api.covid19india.org/zones.json').then(resp => {
            dispatch({ type: GET_ZONE_DATA, payload: resp.data.zones })
        }).catch(err => {
            console.log(err)
        })
    }
}

export const testInfoAction = () => {
    return dispatch => {
        Axios.get('https://api.covid19india.org/state_test_data.json').then(resp => {
            dispatch({ type: GET_TESTED_DATA, payload: resp.data.states_tested_data })
        }).catch(err => {
            console.log(err)
        })
    }
}