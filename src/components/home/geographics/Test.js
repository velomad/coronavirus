import React, { useRef, useEffect } from "react";
import * as d3 from "d3"
import Maharashtra from "./Maharashtra.topo.json";
import { feature , topology} from "topojson"
import { json, geo } from "d3";

const MAHARASHTRA_TOPO = Maharashtra

const Test = () => {
    const map = useRef(null)

    const svg = d3.select(map.current)

    return (
        <div>
            <svg id="chart" height="500" width="500" ref={map} >
            </svg>
        </div>
    )
}
export default Test