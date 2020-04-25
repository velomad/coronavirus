import {combineReducers} from 'redux';
import patientReducer from './patientReducer';
import statsReducer from './statsReducer';
import darkModeReducer from './darkModeReducer';

export default combineReducers({
    patient: patientReducer,
    stats: statsReducer,
    darkMode: darkModeReducer
})