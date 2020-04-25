import { GET_PATIENT_DATA, FETCHING_PATIENT_DATA, ERROR_PATIENT_DATA, GET_STATES, FETCHING_STATES, ERROR_STATES } from '../actions/patientActions'

const initialState = {
    fetchingData: false,
    getPatientData: [],
    errorPatientData: '',
    fetchingStates: false,
    getStatesData: [],
    errorFetchingStates: ''
}

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_PATIENT_DATA:
            return {
                ...state,
                fetchingData: true
            }
        case GET_PATIENT_DATA:
            return {
                ...state,
                fetchingData: false,
                getPatientData: action.payload
            }
        case ERROR_PATIENT_DATA:
            return {
                ...state,
                fetchingData: false,
                errorPatientData: action.payload
            };
        case FETCHING_STATES:
            return {
                ...state,
                fetchingStates: true
            }
        case GET_STATES:
            return {
                ...state,
                getStatesData: action.payload,
                fetchingStates: false
            }
        case ERROR_STATES:
            return {
                ...state,
                fetchingStates: false,
                errorFetchingStates: action.payload
            }
        default:
            return state;
    }

}

export default patientReducer