/** @format */
import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import HomeHead from '../components/HomeHead';
import FoodInfoContainer from '../components/FoodInfoContainer';
import WelcomeDate from '../components/WelcomeDate';
import Categories from '../components/Categories';
import { useNavigate } from 'react-router-dom';
import CategoryFoodInfo from '../components/CategoryFoodInfo';
export default function Home({ user, setUser }) {
	const navigate = useNavigate();

	return (
		<div className='home allow-select'>
			<Header user={user} />
			<div className='home__content'>
				<HomeHead user={user} navigate={navigate} setUser={setUser} />
				<WelcomeDate user={user} />
				<Categories />
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
