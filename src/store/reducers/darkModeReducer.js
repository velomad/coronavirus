import { SET_MODE } from '../actions/darkModeActions';

const initial = { hasmode: false }

const darkModeReducer = (state = initial, action) => {
    // console.log(action)
    if (action.type === SET_MODE) {
        return { hasmode: action.payload }
    } return state
}

export default darkModeReducer