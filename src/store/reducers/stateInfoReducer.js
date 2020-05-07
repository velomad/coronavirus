import { GET_STATES_DATA, GET_DISTRICT_DATA, GET_ZONE_DATA, GET_TESTED_DATA } from "../actions/stateInfoActions";

const initialState = {
    statesInfoData: [],
    districtData: [],
    zoneData: [],
    testData: []
}

const stateInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATES_DATA:
            return {
                ...state,
                statesInfoData: action.payload
            }
        case GET_DISTRICT_DATA:
            return {
                ...state,
                districtData: action.payload
            }
        case GET_ZONE_DATA:
            return {
                ...state,
                zoneData: action.payload
            }
        case GET_TESTED_DATA:
            return {
                ...state,
                testData : action.payload
            }
        default:
            return state
    }
}

export default stateInfoReducer