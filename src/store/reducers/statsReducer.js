import {
  GET_LIVE_STATS,
  ERROR_LIVE_STATS,
  FETCHING_LIVE_STATS,
  GET_STATES_DATA,
  GET_TIME_SERIES,
  GET_TEST_SAMPLES,
  GET_FACTOIDS,
  GET_UPDATES
} from "../actions/statActions";

const initialState = {
  fetchingStats: true,
  errorFetchingStats: "",
  liveStats: [],
  statesData: [],
  timeSeries: [],
  samples: [],
  factoids:[],
  latestUpdates: []
};

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_LIVE_STATS:
      return {
        ...state,
        fetchingStats: true,
      };
    case GET_LIVE_STATS:
      return {
        ...state,
        fetchingStats: false,
        errorFetchingStats: "",
        liveStats: action.payload,
      };
    case ERROR_LIVE_STATS:
      return {
        ...state,
        fetchingStats: false,
        errorFetchingStats: action.payload,
      };
    case GET_STATES_DATA:
      return {
        ...state,
        statesData: action.payload,
      };
    case GET_TIME_SERIES:
      return {
        ...state,
        timeSeries: action.payload,
      };
    case GET_TEST_SAMPLES:
      return {
        ...state,
        samples: action.payload,
      };
      case GET_FACTOIDS:
        return{
          ...state,
          factoids: action.payload
        }
        case GET_UPDATES:
          return{
            ...state,
            latestUpdates:action.payload
          }
    default:
      return state;
  }
};

export default statsReducer;
