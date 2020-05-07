import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { scaleQuantile } from 'd3-scale';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { connect } from 'react-redux';
const INDIA_TOPO_JSON = require('./Maharashtra.topo.json');


const PROJECTION_CONFIG = {
    scale: 2000,
    center: [76.9629, 18.5937] // always in [East Latitude, North Longitude]
};


// Red Variants
const COLOR_RANGE = [
    '#e6f5ff',
    '#ccebff',
    '#b3e0ff',
    '#99d6ff',
    '#80ccff',
    '#66c2ff',
    '#008ae6',
    '#006bb3',
    '#0099ff',
    '#0099ff',
    '#005c99'
];

const DEFAULT_COLOR = '#EEE';

const geographyStyle = {
    default: {
        outline: 'none'
    },
    hover: {
        fill: '#ccc',
        transition: 'all 350ms',
        outline: 'none'
    },
    pressed: {
        outline: 'none'
    }
};


const distData = [  
    {district:"Ahmednagar", value: 5},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0},
    {district:"Ahmednagar", value: 0}
 ]

const getHeatMapData = () => {
    // return newArr
    return  [  
        {id:0,state:"Ahmednagar", value: 5},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0},
        {district:"Ahmednagar", value: 0}
     ]

};



const MaharashtraMap = (props) => {


    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState(getHeatMapData());
    
    // const allDistrictData = (distData.map(item => {
    //     return { id: item.district, state:item.district, value:item.active }
    // }))
    // console.log(allDistrictData)

    // useEffect(() => {
    //     if (distData !== 0) {

    //         const getHeatMapData2 = () => {
    //             return allDistrictData
    //         };
    //         setData(getHeatMapData2())
    //     }
    // },[])


    const colorScale = scaleQuantile()
        .domain(data.map(d => d.value))
        .range(COLOR_RANGE);

    const onMouseEnter = (geo, current = { value: 'NA' }) => {
        return () => {
            setTooltipContent(`${geo.properties.name}: ${current.value}`);
        };
    };

    const onMouseLeave = () => {
        setTooltipContent('');
    };

    return (
        <div>

            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <ComposableMap
                projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={420}
                height={520}
                data-tip=""
            >
                <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            const current = data.find(s => s.id === geo.id);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                                    style={geographyStyle}
                                    onMouseEnter={onMouseEnter(geo, current)}
                                    onMouseLeave={onMouseLeave}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>

        </div>
    )
}


const mapStateToProps = state => {
    return {
        states: state.stats.statesData
        
    }
}

export default connect(mapStateToProps)(MaharashtraMap)