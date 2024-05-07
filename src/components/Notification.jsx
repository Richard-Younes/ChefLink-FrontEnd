/** @format */

import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

function Notification({ message, type }) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Popup open={isVisible}>
			<div
				style={{
					backgroundColor:
						type === 'success'
							? 'rgba(0, 128, 0, 0.5)'
							: 'rgba(255, 0, 0, 0.5)',
					padding: '2rem 0rem',
					color: 'white',
					textAlign: 'center',
				}}>
				{message}
			</div>
		</Popup>
	);
}

export default Notification;
