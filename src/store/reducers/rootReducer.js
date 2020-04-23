import {combineReducers} from 'redux';
import patientReducer from './patientReducer';
import statsReducer from './statsReducer';

export default combineReducers({
    patient: patientReducer,
    stats: statsReducer
})