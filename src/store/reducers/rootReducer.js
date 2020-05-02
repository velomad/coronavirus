import {combineReducers} from 'redux';
import patientReducer from './patientReducer';
import statsReducer from './statsReducer';
import darkModeReducer from './darkModeReducer';
import stateInfoReducer from './stateInfoReducer';

export default combineReducers({
    patient: patientReducer,
    stats: statsReducer,
    darkMode: darkModeReducer,
    stateInfo : stateInfoReducer
})