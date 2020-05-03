import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./stateinfo.css";
import { stateInfoAction, districtInfoAction, zoneInfoAction } from "../../store/actions/stateInfoActions";

const StateInfo = (props) => {
    const [impData, setImpData] = useState({})
    const [districts, setDistrictData] = useState([])


    // eslint-disable-next-line no-lone-blocks
    // {props.zoneInfo.map(item => {
    //     console.log(item.district, item.zone)
    // })}

    useEffect(() => {
        props.getStatesData()
        props.getDistrictData()
        props.getZoneData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

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
    }, [props])

    return (
        <div className="container mt-2">

            <div className="row">

                <div className="bc-icons-2 bread col-sm-6">
                    <nav aria-label="breadcrumb">
                        <ol className={`breadcrumb ${props.modeState && 'grey lighten-1'} white lighten-4`}>
                            <li className="breadcrumb-item"><Link className="black-text" to="/">Home</Link></li>
                            <li className="breadcrumb-item"><span className="badge badge-pill badge-info" style={{ fontSize: "14px" }}> {impData.state} </span></li>
                        </ol>
                    </nav>
                </div>


                <div className="col-sm-6">
                    <p className="text-danger" style={{ margin: 0, fontSize: "24px", fontWeight: 600 }}>{impData.state} </p>
                    <p className="text-muted font-italic" >Last updated on - {new Date(impData.lastupdatedtime).toLocaleString()}</p>
                </div>


            </div>

            <div className="state-counts row" style={{ margin: "5px" }}>
                <div className="col-6 col-md-3 state-count-box rgba-red-slight">
                    <p className="text-danger">Confirm</p>
                    <p className="text-danger" style={{ margin: 0 }}>{impData.confirmed}</p>

                    <div className="row delta-data text-danger">
                        <i className=" far fa-arrow-alt-circle-up cc_pointer text-small"></i><p className="delta-confirmed ">{impData.deltaconfirmed}</p>
                    </div>

                </div>
                <div className="col-6  col-md-3 state-count-box rgba-blue-slight">
                    <p className="text-info">Active</p>
                    <p className="text-info">{impData.active}</p>

                    <div className="row delta-data text-info">
                        <i className=" far fa-arrow-alt-circle-up cc_pointer text-small"></i><p className="delta-confirmed ">{impData.deltaconfirmed}</p>
                    </div>


                </div>
                <div className=" col-6 col-md-3  state-count-box rgba-green-slight">
                    <p className="text-success">Recovered</p>
                    <p className="text-success">{impData.recovered}</p>

                    <div className="row delta-data text-success">
                        <i className=" far fa-arrow-alt-circle-up cc_pointer text-small"></i><p className="delta-confirmed ">{impData.deltarecovered}</p>
                    </div>


                </div>
                <div className=" col-6  col-md-3 state-count-box rgba-grey-slight">
                    <p className="text-black">Deceased</p>
                    <p className="text-black">{impData.deaths}</p>

                    <div className="row delta-data text-black">
                        <i className=" far fa-arrow-alt-circle-up cc_pointer text-small"></i><p className="delta-confirmed ">{impData.deltadeaths}</p>
                    </div>


                </div>
            </div>

            {/* District table and map */}

            <div className="row districts-map">
                <div className="district-data col-md-6">
                    <p className="text-danger" style={{ fontSize: "20px", fontWeight: 600 }}>District Data</p>

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
                                <tr className={`${props.modeState && 'dark-table'} `} key={index}>
                                    <td >{dist.district}</td>
                                    <td>{dist.confirmed}
                                        <i className="text-danger far fa-arrow-alt-circle-up cc_pointer text-small">{dist.delta.confirmed}</i>
                                    </td>
                                    <td>{dist.active}
                                        <i className="text-info far fa-arrow-alt-circle-up cc_pointer text-small">{dist.delta.confirmed}</i>
                                    </td>
                                    <td>{dist.recovered}
                                        <i className="text-success far fa-arrow-alt-circle-up cc_pointer text-small">{dist.delta.recovered}</i>
                                    </td>
                                    <td>{dist.deceased}
                                        <i className="text-black far fa-arrow-alt-circle-up cc_pointer text-small">{dist.delta.deceased}</i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="col-md-6">
                    map goes here

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        stateInfo: state.stateInfo.statesInfoData,
        districtInfo: state.stateInfo.districtData,
        zoneInfo: state.stateInfo.zoneData,
        modeState: state.darkMode.hasmode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatesData: () => dispatch(stateInfoAction()),
        getDistrictData: () => dispatch(districtInfoAction()),
        getZoneData: () => dispatch(zoneInfoAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StateInfo)