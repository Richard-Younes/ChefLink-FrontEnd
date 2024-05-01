/** @format */

import { useNavigate } from 'react-router-dom';
import HomeHead from '../components/HomeHead';
import WelcomeDate from '../components/WelcomeDate';
import Footer from '../components/footer';
import Header from '../components/header';

function Bookmark() {
	const navigate = useNavigate();
	return (
		<div className='home allow-select'>
			<Header />
			<div className='home__content'>
				<HomeHead navigate={navigate} />
				<WelcomeDate />

				<Footer />
			</div>
		</div>
	);
}

export default Bookmark;
