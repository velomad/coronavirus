import axios from "axios";

export const GET_LIVE_STATS = "GET_LIVE_STATS";
export const ERROR_LIVE_STATS = "ERROR_LIVE_STATS";
export const FETCHING_LIVE_STATS = "FETCHING_LIVE_STATS";
export const GET_STATES_DATA = "GET_STATES_DATA";
export const GET_TIME_SERIES = "GET_TIME_SERIES";
export const GET_TEST_SAMPLES = "GET_TEST_SAMPLES";
export const GET_FACTOIDS = "GET_FACTOIDS";
export const GET_UPDATES = "GET_UPDATES";

export const getLiveStatsAction = () => {
  return (dispatch) => {
    dispatch({ type: FETCHING_LIVE_STATS });
    const statsRequest = "https://api.covid19india.org/data.json";
    const factoidsRequest = "https://api.covid19india.org/website_data.json";
    const updatesRequest = "https://api.covid19india.org/updatelog/log.json";

    const statsResp = axios.get(statsRequest);
    const factoidsResp = axios.get(factoidsRequest);
    const updatesResp = axios.get(updatesRequest);

    axios
      .all([statsResp, factoidsResp, updatesResp])
      .then(
        axios.spread((...allData) => {
          const allDataStats = allData[0];
          const allDataFactoids = allData[1];
          const allDataUpdates = allData[2];

          dispatch({
            type: GET_LIVE_STATS,
            payload: allDataStats.data.statewise[0],
          });
          dispatch({
            type: GET_STATES_DATA,
            payload: allDataStats.data.statewise.slice(1, -1),
          });
          dispatch({
            type: GET_TIME_SERIES,
            payload: allDataStats.data.cases_time_series,
          });
          dispatch({
            type: GET_TEST_SAMPLES,
            payload: allDataStats.data.tested,
          });
          dispatch({
            type: GET_FACTOIDS,
            payload: allDataFactoids.data.factoids,
          });
          dispatch({
            type: GET_UPDATES,
            payload: allDataUpdates.data,
          });
        })
      )
      .catch((err) => {
        console.log(err);
        dispatch({ type: ERROR_LIVE_STATS, payload: "Error. Try again" });
      });
  };
};
