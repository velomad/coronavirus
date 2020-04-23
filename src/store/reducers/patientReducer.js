import { GET_PATIENT_DATA, FETCHING_PATIENT_DATA, ERROR_PATIENT_DATA } from '../actions/patientActions'

const initialState = {
    fetchingData: true,
    getPatientData: [],
    errorPatientData: ''
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
        default:
            return state;
    }

}

export default patientReducer