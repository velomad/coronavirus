import React, { useState, useEffect } from "react"
import * as Icon from "react-feather";

const EventsTimeline = (props) => {
    const [last5Days, setLast5Days] = useState([])


    useEffect(() => {
        setLast5Days(props.tests.reverse().slice(0, 5))
    }, [props])

    return (
        <div>

<div className="row">
    
{/* <p>Total population : {JSON.stringify(last5Days[4])}</p> */}
    <div className="col-sm-12">
            <div className="timeline-main">
                <ul className="stepper stepper-vertical timeline timeline-simple pl-0">
                    {last5Days.map((daysData, index) => (
                        <li key={index}>
                             }
                            <a href="#!">
                                <span className="circle blue"></span>
                            </a>
                            <div className="step-content mr-xl-5 p-4 hoverable rgba-grey-slight" style={{width:"300px", borderRadius:"15px"}} >
                                {/* <h4 className="font-weight-bold">Duis aute irure dolor</h4> */}
                                <p className="text-muted mt-3"><i className="far fa-clock" aria-hidden="true"></i>{daysData.updatedon}</p>
                                    <p className="mb-1">
                                    Total tested :    {daysData.totaltested <= 0 ? <span>NA</span>  :  Number(daysData.totaltested).toLocaleString()}
                                    </p>
                                    <p className="mb-1">
                                        <span className="text-danger"><Icon.Plus  size={15}/>Ve : { daysData.positive === '' ? <span>NA</span> : daysData.positive} </span>, <span className="text-success"><Icon.Minus size={15}/>Ve : { daysData.negative=== '' ? <span>NA</span> : daysData.negative}</span>
                                    </p>
                                    <p className="mb-1 ">
                                    Positivity rate : { !daysData.positive && !daysData.totaltested ? <span>NA</span> : parseFloat((daysData.positive / daysData.totaltested)*100).toFixed(2)}{daysData.positive || daysData.totaltested ? <span>%</span> : ''} 
                                    </p>
                                    {/* <p className="mb-1">
                                    Tests/million : {daysData.testspermillion}
                                    </p> */}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
            </div>
        </div>
    )
}

export default EventsTimeline