import { GET_STATES_DATA } from "../actions/stateInfoActions";

const initialState = {
    statesInfoData: []
}

const stateInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATES_DATA:
            return {
                ...state,
                statesInfoData: action.payload
            }
        default:
            return state
    }
}

export default stateInfoReducer