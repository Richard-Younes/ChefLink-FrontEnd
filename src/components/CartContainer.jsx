/** @format */

import { useEffect, useState } from 'react';
import { url } from '../values.js';

function CartContainer() {
	const [cartInfo, setCartInfo] = useState(null);
	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`${url}cart/get_cart_details`, {
				credentials: 'include',
			});
			const data = await response.json();
			setCartInfo(data);
		}
		fetchData();
	}, []);

	return (
		<div>
			<h1>My Cart</h1>
			<h2></h2>
		</div>
	);
}

export default CartContainer;
