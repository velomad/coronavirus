import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./stateinfo.css";
import { stateInfoAction, districtInfoAction, zoneInfoAction, testInfoAction } from "../../store/actions/stateInfoActions";
import MaharashtraMap from "../home/geographics/MaharashtraMap";
import EventsTimeline from "./EventsTimeline";
import * as Icon from "react-feather";



const StateInfo = (props) => {
    const [impData, setImpData] = useState({})
    const [districts, setDistrictData] = useState([])
    const [zone, setZone] = useState([])
    const [tests, setTests] = useState([])


    // Array of zone Data
    var zonedStates = []

    // array of tests Data
    var testsData = []

    // holds the array of the selected state
    var lastObject = tests
    var todaysTestCount = tests[tests.length - 1]

    console.log(todaysTestCount)

    // for counting total tests till the date of the selected state
    var totalTestCount = 0
    for (var count in lastObject) {
        totalTestCount += parseInt(lastObject[count].totaltested)
    }


    useEffect(() => {
        props.getStatesData()
        props.getDistrictData()
        props.getZoneData()
        props.getTestData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)

        if (props.stateInfo.length !== 0) {

            // get the state from the params statecode
            const stateCode = props.match.params.statename
            const index = props.stateInfo.findIndex(name => name.statecode === stateCode)
            const state = props.stateInfo[index]
            setImpData(state)
        }
        if (props.districtInfo.length !== 0) {

            // get the district data from the statecode
            const stateCode = props.match.params.statename
            const districtIndex = props.districtInfo.findIndex(districtItem => districtItem.statecode === stateCode)
            const district = props.districtInfo[districtIndex].districtData
            setDistrictData(district)
        }

        if (props.zoneInfo.length !== 0) {

            // get the Zone Data for current selected state 
            const stateCode = props.match.params.statename
            for (var i in props.zoneInfo) {
                if (props.zoneInfo[i].statecode === stateCode) {
                    zonedStates.push(props.zoneInfo[i])
                }
            }
            setZone(zonedStates)
        }


        if (props.testInfo.length !== 0) {

            // get the Zone Data for current selected state 
            // const stateCode = props.match.params.statename
            for (var tests in props.testInfo) {
                if (props.testInfo[tests].state === impData.state) {
                    testsData.push(props.testInfo[tests])
                }
            }
            setTests(testsData)
        }

    }, [ props])

    // Adding zone property in the OG districts state array 
    for (var i in districts) {
        for (var j in zone) {
            if (districts[i].district === zone[j].district) {
                districts[i]['zone'] = zone[j].zone
            }
        }
    }

    const handleStateSelect = e => {
        props.history.push(`${e.target.value}`)
    }


    return (
        <div className="container mt-3">

            <div className="row">
                <div className="bc-icons-2 bread col-sm-4">
                    <nav aria-label="breadcrumb">
                        <ol className={`breadcrumb ${props.modeState && 'grey lighten-1'} grey lighten-4`}>
                            <li className="breadcrumb-item"><Link className="black-text" to="/">Home</Link></li>
                            <li className="breadcrumb-item">
                                <select onChange={handleStateSelect}>
                                    <option defaultValue>{impData.state}</option>
                                    {props.stateInfo.slice(0, 32).map((state, index) => (
                                        <option key={index} value={state.statecode}>{state.state}</option>
                                    ))}
                                </select>
                            </li>
                            {/* <li className="breadcrumb-item"><span className="badge badge-pill badge-info" style={{ fontSize: "14px" }}> {impData.state} </span></li> */}
                        </ol>
                    </nav>
                </div>


                <div className="col-sm-4">
                    <p className="text-danger" style={{ margin: 0, fontSize: "24px", fontWeight: 600 }}>{impData.state} </p>
                    <p className="text-muted font-italic" >Last updated on - {new Date(impData.lastupdatedtime).toLocaleString()}</p>
                </div>

                <div className="col-sm-4">
                    <p> Total tests conducted : {lastObject !== undefined && Number(totalTestCount).toLocaleString()}</p>
                    <p> Todays tests count : {todaysTestCount !== undefined && Number(todaysTestCount.totaltested).toLocaleString()}</p>
                </div>


            </div>

            <div className="state-counts row" style={{ margin: "5px" }}>
    
                <div className="col-6 col-md-3 state-count-box rgba-red-slight">
                
                    <p className="text-danger">Confirm <Icon.Info className="info-icon" size={15} /></p>
                    
                    <p className="text-danger" style={{ margin: 0 }}>{impData.confirmed}</p>

                    {impData.deltaconfirmed <= 0 ? <p style={{ margin: "5px" }} className="text-danger">No new cases yet</p> :
                        <div className="row delta-data text-danger">
                            <Icon.ArrowUp size={20} /><p style={{ margin: 0 }} className="delta-confirmed ">{impData.deltaconfirmed}</p>
                        </div>
                    }
                    <p className="text-danger" style={{ fontSize: '12px' }}>Confirm/Mill<sup>n</sup> : </p>

                </div>

                <div className="col-6  col-md-3 state-count-box rgba-blue-slight">
                    <p className="text-info">Active <Icon.Info className="info-icon" size={15} /></p>
                    <p className="text-info" style={{ margin: 0 }}>{impData.active}</p>

                    {impData.deltaconfirmed <= 0 ? <p style={{ margin: "5px" }} className="text-info">No new cases yet</p> :
                        <div className="row delta-data text-info">
                            <Icon.ArrowUp size={20} /><p style={{ margin: 0 }} className="delta-confirmed ">{impData.deltaconfirmed}</p>
                        </div>
                    }
                    <p className="text-info" style={{ fontSize: "12px" }}>Active Rate : {parseFloat(impData.active / impData.confirmed * 100).toFixed(2)} </p>
                </div>

                <div className=" col-6 col-md-3  state-count-box rgba-green-slight">
                    <p className="text-success">Recovered <Icon.Info className="info-icon" size={15} /></p>
                    <p className="text-success" style={{ margin: 0 }}>{impData.recovered}</p>

                    {impData.deltarecovered <= 0 ? <p style={{ margin: "5px" }} className="text-success">No new cases yet</p> :
                        <div className="row delta-data text-success">
                            <Icon.ArrowUp size={20} /><p style={{ margin: 0 }} className="delta-confirmed ">{impData.deltarecovered}</p>
                        </div>
                    }
                    <p className="text-success" style={{ fontSize: "12px" }}>Recovery Rate : {parseFloat(impData.recovered / impData.confirmed * 100).toFixed(2)}% </p>
                </div>
                <div className=" col-6  col-md-3 state-count-box rgba-grey-slight">
                    <p className="text-black">Deceased <Icon.Info className="info-icon" size={15} /></p>
                    <p style={{ margin: 0 }} className="text-black">{impData.deaths}</p>

                    {impData.deltadeaths <= 0 ? <p style={{ margin: "5px" }} className="text-black">No new cases yet</p> :

                        <div className="row delta-data text-black">
                            <Icon.ArrowUp size={20} /><p style={{ margin: 0 }} className="delta-confirmed ">{impData.deltadeaths}</p>
                        </div>
                    }
                    <p className="text-black" style={{ fontSize: "12px" }}>Recovery Rate : {parseFloat(impData.deaths / impData.confirmed * 100).toFixed(2)}% </p>
                </div>
            </div>

            {/* District table and map */}

            <div className="row districts-map">
                <div className="district-data col-md-6">
                    <p className="text-danger" style={{ fontSize: "20px", fontWeight: 600 }}>District-Wise Stats</p>

                    <div className="container">
                        <div className="row zone-info">
                            <span className="zoneSign red lighten-2"></span><br />
                            <span className="zoneSign orange lighten-2"></span><br />
                            <span className="zoneSign green lighten-2"></span>
                            <span className="sign-text">Current zone of Districts</span>
                        </div>
                    </div>

                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Districts</th>
                                <th className="confirmed"></th>
                                <th className="active"></th>
                                <th className="recovered"></th>
                                <th className="deceased"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {districts.map((dist, index) => (
                                <tr className={`${props.modeState && 'dark-table'} ${dist.zone === 'Red' ? 'rgba-red-slight' : dist.zone === 'Orange' ? 'rgba-orange-slight' : dist.zone === '' ? '' : 'rgba-green-slight'} `} key={index}>
                                    <td >{dist.district}</td>
                                    <td>{dist.confirmed}
                                        {dist.delta.confirmed !== 0 &&
                                            <i className="text-danger far fa-arrow-alt-circle-up cc_pointer text-small">{dist.delta.confirmed}</i>
                                        }
                                        {/* {dist.zone && <p style={{ margin: 0 }}>Zone : {dist.zone}</p>} */}
                                        {/* {zone.map((z, index) => (
                                            dist.district === z.district && <p key={index}>{z.zone}</p>
                                        ))} */}

                                        {/* {zone[index] !== undefined  && dist.district === zone[index].district ? <p className="text-danger"> { zone[index].zone} </p> : <p>Not available</p>} */}

                                    </td>
                                    <td>{dist.active}
                                        {dist.delta.confirmed !== 0 &&
                                            <i className="text-info far fa-arrow-alt-circle-up cc_pointer text-small">{dist.delta.confirmed}</i>
                                        }
                                    </td>
                                    <td>{dist.recovered}
                                        {dist.delta.recovered !== 0 &&
                                            <i className="text-success far fa-arrow-alt-circle-up cc_pointer text-small">{dist.delta.recovered}</i>
                                        }
                                    </td>
                                    <td>{dist.deceased}
                                        {dist.delta.deceased !== 0 &&
                                            <i className="text-black far fa-arrow-alt-circle-up cc_pointer text-small">{dist.delta.deceased}</i>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="col-md-6">
                    {/* {props.match.params.statename === 'MH' && <MaharashtraMap />} */}
                    <EventsTimeline tests={lastObject} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        stateInfo: state.stateInfo.statesInfoData,
        districtInfo: state.stateInfo.districtData,
        testInfo: state.stateInfo.testData,
        zoneInfo: state.stateInfo.zoneData,
        modeState: state.darkMode.hasmode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatesData: () => dispatch(stateInfoAction()),
        getDistrictData: () => dispatch(districtInfoAction()),
        getZoneData: () => dispatch(zoneInfoAction()),
        getTestData: () => dispatch(testInfoAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StateInfo)  