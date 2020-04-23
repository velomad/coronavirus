import React, { useEffect } from 'react';
import LiveStats from './LiveStats';
import UpdateLiveStats from './UpdateLiveStats';
import StateTable from './StateTable';
import { connect } from 'react-redux';
import { getLiveStatsAction } from '../../store/actions/statActions';
import ActiveMiniGraph from './minigraphs/ActiveMiniGraph';
import ConfirmedMiniGraph from './minigraphs/ConfirmedMiniGraph';
import RecoveredMiniGraph from './minigraphs/RecoveredMiniGraph';
import DeceasedMiniGraph from './minigraphs/DeceasedMiniGraph';
import TestedSamples from './TestedSamples';
import LatestUpdates from './LatestUpdates';

const Home = (props) => {
	useEffect(() => {
		props.getLiveStats();
	}, []);

	return (
		<div className="home">
			{/* factoids banner */}
			{/* <Factoids /> */}

			<div className="container">
				<div className="row">
					<div className="col-sm-6 col-lg-3">
						<UpdateLiveStats lastUpdatedTime={props.liveStatsData.lastupdatedtime} />
					</div>

					<div className="col-sm-6 col-lg-3">
						<LatestUpdates />
					</div>
				</div>

				{/* stats cards  */}
				<div className="row">
					<div className="col-sm-6 col-lg-3 d-flex justify-content-center">
						<LiveStats
							name="Confirmed"
							count={props.liveStatsData.confirmed}
							todayCount={props.liveStatsData.deltaconfirmed}
							badgeColor="badge badge-danger"
							hoverColor="red"
							textColor="text-danger"
							activegraph={<ConfirmedMiniGraph />}
						/>
					</div>
					<div className="col-sm-6 col-lg-3 d-flex justify-content-center">
						<LiveStats
							name="Active"
							count={props.liveStatsData.active}
							todayCount={props.liveStatsData.deltaconfirmed}
							badgeColor="badge badge-primary"
							hoverColor="blue"
							textColor="text-primary"
							activegraph={<ActiveMiniGraph />}
						/>
					</div>
					<div className="col-sm-6 col-lg-3 d-flex justify-content-center">
						<LiveStats
							name="Recovered"
							count={props.liveStatsData.recovered}
							todayCount={props.liveStatsData.deltarecovered}
							badgeColor="badge badge-success"
							hoverColor="green"
							textColor="text-success"
							activegraph={<RecoveredMiniGraph />}
						/>
					</div>
					<div className="col-sm-6 col-lg-3 d-flex justify-content-center">
						<LiveStats
							name="Deceased"
							count={props.liveStatsData.deaths}
							todayCount={props.liveStatsData.deltadeaths}
							badgeColor="badge badge-light"
							hoverColor="grey"
							textColor="text-dark"
							activegraph={<DeceasedMiniGraph />}
						/>
					</div>
				</div>

				<TestedSamples />

				{/* State wise Table */}
				<StateTable
					stateData={props.statesData}
					textConfirmed="text-danger"
					textActive="text-primary"
					textRecovered="text-success"
					textDeceased="text-dark"
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		liveStatsData: state.stats.liveStats,
		statesData: state.stats.statesData,
		timeSeriesData: state.stats.timeSeries,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getLiveStats: () => dispatch(getLiveStatsAction()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
