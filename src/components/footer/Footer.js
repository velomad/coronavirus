import React from "react";
import { connect } from "react-redux";
import * as Icon from "react-feather";

const Footer = (props) => {
    return (
        <div className="container footer-section">

            <footer className="page-footer font-small">

                <div className="container">

                    <div className="row">

                        <div className="col-md-12 py-5">
                            <div className="mb-5 flex-center">

                                <span className="social-icon">
                                    <Icon.Facebook color={props.modeState === true ? "white" : "black"}/>
                                </span>
                                
                                <span className="social-icon">
                                    <Icon.Instagram color={props.modeState === true ? "white" : "black"}/>
                                </span>

                                <span className="social-icon">
                                    <Icon.Mail color={props.modeState === true ? "white" : "black"}/>
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="footer-copyright text-center py-3">
                    <p style={{margin:0 , color:props.modeState === true ? "white" : "black"}} className="text-black">Go Corona, Corona Go.</p>
                </div>

            </footer>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        modeState: state.darkMode.hasmode
    }
}

export default connect(mapStateToProps)(Footer)