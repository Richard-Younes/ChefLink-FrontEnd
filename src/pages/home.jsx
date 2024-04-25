/** @format */
import { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HomeHead from '../components/HomeHead';
import WelcomeDate from '../components/WelcomeDate';
import Categories from '../components/Categories';
import { useNavigate } from 'react-router-dom';
import CategoryFoodInfo from '../components/CategoryFoodInfo';

import { url } from '../values';

export default function Home() {
	const navigate = useNavigate();

	const [foodByType, setFoodByType] = useState(null);

	useEffect(() => {
		async function getFoodByType() {
			try {
				const res = await fetch(`${url}food/get_food_by_type`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					include: 'credentials',
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message);
				}

				setFoodByType(data.data);
			} catch (error) {
				console.error(error);
			}
		}

		getFoodByType();
	}, []);

	console.log(foodByType);

	return (
		<div className='home allow-select'>
			<Header />
			<div className='home__content'>
				<HomeHead navigate={navigate} />
				<WelcomeDate />
				<Categories types={foodByType?.types} />
				<CategoryFoodInfo />
				<CategoryFoodInfo />
				<CategoryFoodInfo />
				<CategoryFoodInfo />
				<CategoryFoodInfo />

				{/* Footer */}
				<Footer />
			</div>
		</div>
	);
}
