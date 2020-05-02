import React from 'react';
import './tabletoggler';
import './accordian.scss';

const AccordianTable = (props) => {
    console.log(props.stateData)
    return (
        <div className="container">
            <table class="table col fold-table">
                <thead>
                    <tr>
                        <th>State/UT</th><th>Cnfrmd</th><th>Actv</th><th>Rcvrd</th><th>Dcsd</th>
                    </tr>
                </thead>
                <tbody>
                    {props.stateData.map((state,index) => (
                    <tr class="view" key={index}>
                        <td>{state.state}</td>
                        <td>{state.confirmed}</td>
                        <td>{state.active}</td>
                        <td>{state.recovered}</td>
                        <td>{state.deaths}</td>
                    </tr>
                    ))}
                    <tr class="fold">
                        <td colspan="7">
                            <div class="fold-content">
                                <h3>Updated At</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>District</th><th>confirmed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Nanded</td>
                                            <td>13245</td>
                                        </tr>
                                        <tr>
                                            <td>Mumbai</td>
                                            <td>13288</td>
                                        </tr>
                                        <tr>
                                            <td>Plghar</td>
                                            <td>12341</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    )

}


export default AccordianTable