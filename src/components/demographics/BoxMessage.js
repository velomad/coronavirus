import React, { useState } from 'react';
import './demographics.css';
import { useEffectOnce } from 'react-use'

const BoxMessage = () => {
	const [messageBox, setMessageBox] = useState(true)


	const handleMessageBox = () => {
		setMessageBox(false)
	}


	return (
		<div>
			{messageBox &&
				<div className="card-container">
					<div className="card rgba-blue-slight card-styles">
						<div className="card-body">
							<i onClick={handleMessageBox} className="d-flex justify-content-end fas fa-times text-info"></i>
							<p className="card-text">

								It is important that we do not think of these as just tiny boxes,
								numbers, or just another part of statistics - among these are our
								neighbors, our teachers, our healthcare workers, our supermarket
								vendors, our friends, our co-workers, our children or our
								grandparents.
								<br />
								<br />
          						Among these are our people.
							</p>
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default BoxMessage;
