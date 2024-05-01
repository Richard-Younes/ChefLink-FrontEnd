/** @format */

import { useNavigate } from 'react-router-dom';
import CartContainer from '../components/CartContainer';
import HomeHead from '../components/HomeHead';
import Footer from '../components/footer';
import Header from '../components/header';
import { useEffect } from 'react';
import { url } from '../values.js';

function Cart() {
	const navigate = useNavigate();

	return (
		<div className='home allow-select'>
			<Header />
			<div className='home__content'>
				<HomeHead navigate={navigate} />
				<CartContainer />
				<Footer />
			</div>
		</div>
	);
}

export default Cart;
