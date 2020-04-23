import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../index.css';

const LatestUpdates = (props) => {
	const [latestUpdates, setLatestUpdates] = useState(false);

	return (
		<div>
			<div>
				<p onClick={() => setLatestUpdates(!latestUpdates)} className="updates">
					Latest Updates
					{latestUpdates ? <i className="mt-1 far fa-bell-slash"></i> : <i className="mt-1 far fa-bell"></i>}
				</p>
			</div>

			{latestUpdates && (
				<div>
					{props.getLatestUpdates
						.reverse()
						.slice(0, 5)
						.map((item, index) => (
							<div key={index}>
								<p style={{ width: '600px' }} className="col note note-secondary" >
									{item.update}
								</p>
							</div>
						))}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		getLatestUpdates: state.stats.latestUpdates,
	};
};

export default connect(mapStateToProps)(LatestUpdates);
