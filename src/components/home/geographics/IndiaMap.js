import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import LinearGradient from './LinearGradient.js';
import { scaleQuantile } from 'd3-scale';
import StateStats from './StateStats';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { connect } from 'react-redux';
const INDIA_TOPO_JSON = require('./india.topo.json');


const PROJECTION_CONFIG = {
    scale: 650,
    center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
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

const getRandomInt = () => {
    return parseInt(Math.random() * 100);
};

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


const getHeatMapData = () => {
    // return newArr
    return [
        { id: 'AP', state: 'Andhra Pradesh', value: 524 },
        { id: 'AR', state: 'Arunachal Pradesh', value: getRandomInt() },
        { id: 'AS', state: 'Assam', value: getRandomInt() },
        { id: 'BR', state: 'Bihar', value: getRandomInt() },
        { id: 'CT', state: 'Chhattisgarh', value: getRandomInt() },
        { id: 'GA', state: 'Goa', value: 21 },
        { id: 'GJ', state: 'Gujarat', value: 22 },
        { id: 'HR', state: 'Haryana', value: getRandomInt() },
        { id: 'HP', state: 'Himachal Pradesh', value: 24 },
        { id: 'JH', state: 'Jharkhand', value: 26 },
        { id: 'KA', state: 'Karnataka', value: 27 },
        { id: 'KL', state: 'Kerala', value: getRandomInt() },
        { id: 'MP', state: 'Madhya Pradesh', value: getRandomInt() },
        { id: 'MH', state: 'Maharashtra', value: 556456 },
        { id: 'MN', state: 'Manipur', value: getRandomInt() },
        { id: 'ML', state: 'Meghalaya', value: 59 },
        { id: 'MZ', state: 'Mizoram', value: getRandomInt() },
        { id: 'NL', state: 'Nagaland', value: 59 },
        { id: 'OR', state: 'Odisha', value: 59 },
        { id: 'PB', state: 'Punjab', value: getRandomInt() },
        { id: 'RJ', state: 'Rajasthan', value: getRandomInt() },
        { id: 'SK', state: 'Sikkim', value: getRandomInt() },
        { id: 'TN', state: 'Tamil Nadu', value: getRandomInt() },
        { id: 'TG', state: 'Telangana', value: 85 },
        { id: 'TR', state: 'Tripura', value: 14 },
        { id: 'UT', state: 'Uttarakhand', value: getRandomInt() },
        { id: 'UP', state: 'Uttar Pradesh', value: 15 },
        { id: 'WB', state: 'West Bengal', value: 17 },
        { id: 'WB', state: 'West Bengal', value: 17 },
        { id: 'AN', state: 'Andaman and Nicobar Islands', value: getRandomInt() },
        { id: 'CH', state: 'Chandigarh', value: getRandomInt() },
        { id: 'DN', state: 'Dadra and Nagar Haveli', value: 19 },
        { id: 'DD', state: 'Daman and Diu', value: 20 },
        { id: 'DL', state: 'Delhi', value: 59 },
        { id: 'JK', state: 'Jammu and Kashmir', value: 25 },
        { id: 'LA', state: 'Ladakh', value: getRandomInt() },
        { id: 'LD', state: 'Lakshadweep', value: getRandomInt() },
        { id: 'PY', state: 'Puducherry', value: getRandomInt() }
    ];
};



const IndiaMap = (props) => {


    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState(getHeatMapData());
    const [confirmed, setConfirmed] = useState('');
    const [active, setActive] = useState('');
    const [recovered, setRecovered] = useState('');
    const [deceased, setDeceased] = useState('');
    const [stateCode, setStateCode] = useState('');
    const [stateName, setStateName] = useState('');
    const [lastUpdatedTime, setLastUpdatedTime] = useState('');

    const allStatesData = (props.states.map(item => {
        return { id: item.statecode, state: item.state, value: JSON.parse(item.active), confirmed: JSON.parse(item.confirmed), recovered: JSON.parse(item.recovered), deceased: JSON.parse(item.deaths), lastupdatedtime: new Date(item.lastupdatedtime).toLocaleString() }
    }))

    useEffect(() => {
        if (props.states.length !== 0) {

            const getHeatMapData2 = () => {
                return allStatesData
            };
            setData(getHeatMapData2())
        }
    }, [props])


    const gradientData = {
        fromColor: COLOR_RANGE[0],
        toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
        min: 0,
        max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
    };

    const colorScale = scaleQuantile()
        .domain(data.map(d => d.value))
        .range(COLOR_RANGE);

    const onMouseEnter = (geo, current = { value: 'NA' }) => {

        return () => {
            setTooltipContent(`${geo.properties.name}: ${current.value}`);
            setActive(current.value)
            setStateName(`${geo.properties.name}`)
            setConfirmed(current.confirmed)
            setRecovered(current.recovered)
            setDeceased(current.deceased)
            setStateCode(current.id)
            setLastUpdatedTime(current.lastupdatedtime)
        };
    };

    const onMouseLeave = () => {
        setTooltipContent('');
    };

    return (
        <div>
            <StateStats confirmed={confirmed} stateName={stateName} active={active} recovered={recovered} deceased={deceased} lastUpdatedTime={lastUpdatedTime} stateCode={stateCode} />
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
            <LinearGradient data={gradientData} />

        </div>
    )
}


const mapStateToProps = state => {
    return {
        states: state.stats.statesData
    }
}

export default connect(mapStateToProps)(IndiaMap)