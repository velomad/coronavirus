import React, { useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./stateinfo.css";
import { stateInfoAction } from "../../store/actions/stateInfoActions";


const StateInfo = (props) => {

    useEffect(() => {
        props.getStatesData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const stateCode = props.match.params.stateCode
    const index = props.stateInfo.findIndex(name => name.statecode === stateCode)
    const state = props.stateInfo[index]

    return (
        <div className="container mt-3">
            <div class="bc-icons-2 bread">

                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb grey lighten-4">
                        <li class="breadcrumb-item"><Link class="black-text" to="/">Home</Link></li>
                        <li class="breadcrumb-item"><span> {state.state} </span></li>
                    </ol>
                </nav>

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        stateInfo: state.stateInfo.statesInfoData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatesData: () => dispatch(stateInfoAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StateInfo)