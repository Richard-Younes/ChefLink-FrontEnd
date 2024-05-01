/** @format */

import { useNavigate } from 'react-router-dom';
import HomeHead from '../components/HomeHead';
import Footer from '../components/footer';
import Header from '../components/header';

function Layout({ children }) {
	const navigate = useNavigate();

	return (
		<div className='home allow-select'>
			<Header />
			<div className='home__content'>
				<HomeHead navigate={navigate} />
				{children}
				<Footer />
			</div>
		</div>
	);
}

export default Layout;
