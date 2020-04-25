// Darkmode Action
export const SET_MODE = "SET_MODE";


export const darkModeAction = (mode) => {
    return {
        type: SET_MODE,
        payload: mode
    }
}

