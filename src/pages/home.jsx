/** @format */
import { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HomeHead from '../components/HomeHead';
import WelcomeDate from '../components/WelcomeDate';
import Categories from '../components/Categories';
import { useNavigate } from 'react-router-dom';
import CategoryFoodInfo from '../components/CategoryFoodInfo';
import Spinner from '../components/Spinner';

import { url } from '../values';

export default function Home() {
	const navigate = useNavigate();

	const [foodByType, setFoodByType] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		async function getFoodByType() {
			try {
				setIsLoading(true);
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
			} finally {
				setIsLoading(false);
			}
		}

		getFoodByType();
	}, []);

	console.log(foodByType);

	const foods = foodByType?.foods;

	return (
		<div className='home allow-select'>
			<Header />
			<div className='home__content'>
				<HomeHead navigate={navigate} />
				<WelcomeDate />
				<Categories types={foodByType?.types} />
				{isLoading ? (
					<Spinner />
				) : (
					foods?.map(food => <CategoryFoodInfo key={food._id} food={food} />)
				)}

				<Footer />
			</div>
		</div>
	);
}
