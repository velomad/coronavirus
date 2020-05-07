import React, { useState, useEffect } from 'react';
import './statetable.css';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';


const StateTable = (props) => {
	const [searchValue, setSearchValue] = useState('');

	let helperVar = [];
	let helperVar2 = [];
	//state search filter
	let filteredStates = props.stateData.filter((stateName) => {
		helperVar.push(stateName.deltaconfirmed);
		helperVar2.push(stateName.deltarecovered);
		return stateName.state.toLowerCase().includes(searchValue.toLowerCase());
	});

	// ==============================================================================
	// labels setter and unsetter depending upon if there is any case for current date
	var isConfirmed;

	for (var i in helperVar) {
		if (helperVar[i] > 60) {
			isConfirmed = 'activate';
		} else {
		}
	}

	var isRecover;
	// eslint-disable-next-line no-redeclare
	for (var i in helperVar2) {
		if (helperVar2[i] > 35) {
			isRecover = 'activate';
		} else {
		}
	}
	// =============================================================================

	console.log();
	return (
		<div className="container">
			<div className="row before-table-row mt-3">
				{/* <input
					className={`form-control col-sm-3 ${props.modeState && 'dark-body'}`}
					id="tableSearch"
					type="text"
					placeholder="Search State"
					value={searchValue}
					onChange={(e) => setSearchValue(e)}
				/> */}

				{isConfirmed && (
					<div className="label ml-3">
						<div className="box rgba-red-slight text-danger">Today's High Infection</div>
					</div>
				)}

				{isRecover && (
					<div className="label ml-3">
						<div className="box rgba-green-slight text-success">Good Recoveries</div>
					</div>
				)}
			</div>

			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th>States/UT</th>
						<th className="confirmed"></th>
						<th className="active"></th>
						<th className="recovered"></th>
						<th className="deceased"></th>
					</tr>
				</thead>
				<tbody>
					{filteredStates.map((data, index) => (
						<tr key={index} >
							{/* <Link to={`state/${data.statecode}`}> */}
							<td className={`${props.modeState && 'dark-table'} `}>{data.state}</td>
							<td className={`${data.deltaconfirmed > 60 ? `rgba-red-slight` : ''} ${props.modeState && 'dark-table'}`}>
								{data.confirmed}
								{data.deltaconfirmed <= 0 ? (
									''
								) : (
										<div>
											<i className={`far fa-arrow-alt-circle-up cc_pointer ${props.textConfirmed}`}>
												{data.deltaconfirmed}
											</i>
										</div>
									)}
							</td>
							<td className={`${props.modeState && 'dark-table'} `}>
								{data.active}
								{data.deltaconfirmed <= 0 ? (
									''
								) : (
										<div>
											<i className={`far fa-arrow-alt-circle-up cc_pointer ${props.textActive}`}>
												{data.deltaconfirmed}
											</i>
										</div>
									)}
							</td>
							<td className={`${data.deltarecovered > 35 ? `rgba-green-slight` : ''} ${props.modeState && 'dark-table'}`}>
								{data.recovered}
								{data.deltarecovered <= 0 ? (
									''
								) : (
										<div>
											<i className={`far fa-arrow-alt-circle-up cc_pointer ${props.textRecovered}`}>
												{data.deltarecovered}
											</i>
										</div>
									)}
							</td>
							<td className={`${props.modeState && 'dark-table'} `}>
								{data.deaths}
								{data.deltadeaths <= 0 ? (
									''
								) : (
										<div>
											<i className={`far fa-arrow-alt-circle-up cc_pointer ${props.textDeceased}`}>
												{data.deltadeaths}
											</i>
										</div>
									)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		modeState: state.darkMode.hasmode
	}
}

export default connect(mapStateToProps)(StateTable);
