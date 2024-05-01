/** @format */
import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import CategoryFoodInfo from '../components/CategoryFoodInfo';
import Spinner from '../components/Spinner';

import { url } from '../values';

export default function Home() {
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

	const foods = foodByType?.foods;

	return (
		<>
			<Categories types={foodByType?.types} />
			{isLoading ? (
				<Spinner />
			) : (
				foods?.map(food => <CategoryFoodInfo key={food._id} food={food} />)
			)}
		</>
	);
}
