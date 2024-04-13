/** @format */
import { useState } from 'react';
function WelcomeDate({ user }) {
	// eslint-disable-next-line no-unused-vars
	const [currentDate, setCurrentDate] = useState(getDate());

	function getDate() {
		const options = {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		};
		const today = new Date();
		return today.toLocaleDateString('en-US', options);
	}

	return (
		<div>
			<p className='welcome-notice'>
				Welcome, {user} <span className='home__date'>{currentDate}</span>
			</p>
		</div>
	);
}

export default WelcomeDate;
