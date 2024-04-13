/** @format */
import { useState } from 'react';
import burgerImage from '../assets/Cuisine/burger1.jpg';
import Header from '../components/header';
import Footer from '../components/footer';

import { Link, useNavigate } from 'react-router-dom';

const categories = [
	{ name: 'All', key: 1 },
	{ name: 'Pizza', key: 2 },
	{ name: 'Italian', key: 3 },
	{ name: 'Salad', key: 4 },
	{ name: 'Pasta', key: 5 },
	{ name: 'Desert', key: 6 },
];
export default function Home({ user }) {
	const navigate = useNavigate();

	return (
		<div className='home allow-select'>
			<Header user={user} />
			<div className='home__content'>
				<HomeHead user={user} navigate={navigate} />
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

function HomeHead({ user, navigate }) {
	function handleLogOut() {
		async function logOut() {
			try {
				const res = await fetch(
					'https://flask-cheflink.onrender.com/auth/logout',
					{ credentials: 'include' }
				);
				if (!res.ok) {
					const data = await res.json();
					throw new Error(`${data.error}`);
				}

				// Logout successful

				localStorage.removeItem('user');

				navigate('/login');
			} catch (error) {
				console.error(`LogOut error 💥💥:${error}`);
			}
		}
		logOut();
	}

	return (
		<div className='home__content--top'>
			<form className='searchbar-form'>
				<input
					type='text'
					placeholder='Search'
					className='searchbar-form__input'
				/>
				<span className='search-icon'>
					<ion-icon name='search-sharp'></ion-icon>
				</span>
			</form>
			{user === 'Guest' ? (
				<Link to='login' className='btn btn--green-small home__btn'>
					Login
				</Link>
			) : (
				<a className='btn btn--red-small home__btn' onClick={handleLogOut}>
					Logout
				</a>
			)}
		</div>
	);
}

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

function Categories() {
	return (
		<div className='categories'>
			<p style={{ marginBottom: '1rem' }}>Select Category</p>
			<div className='categories-container'>
				{categories.map(category => (
					<Category categ={category.name} key={category.key} />
				))}
			</div>
		</div>
	);
}

function Category({ categ }) {
	return (
		<button
			className={`btn category__btn ${
				categ === 'All' ? ' category__btn-active' : ''
			}`}>
			{categ}
		</button>
	);
}
const biccoAyre = [1, 2, 3, 4, 5, 6, 7, 8];
function CategoryFoodInfo() {
	return (
		<div className='category-food-info-container'>
			<h2 className='category-food-info-container__title'>Top Rated🔥</h2>
			<div className='category-food-info-container__container'>
				<div className='category-food-info-container__clipper'>
					{biccoAyre.map(ayre => (
						<FoodInfoContainer key={ayre} />
					))}
				</div>
				<div className='arrow-right-icon'>
					<ion-icon name='chevron-forward-outline'></ion-icon>
				</div>
			</div>
		</div>
	);
}

function FoodInfoContainer() {
	return (
		<div className='food-container'>
			<img
				className='food-container__image'
				src={burgerImage}
				alt='Food image'
			/>
			<div className='food-container__header'>
				<p className='food-container__name'>Chicken</p>
				<div className='food-container__bookmark-icon'>
					<ion-icon name='bookmark-outline'></ion-icon>
				</div>
			</div>

			<div className='food-container__info'>
				<ion-icon name='star'></ion-icon>
				<p className='food-container__rating'>4.7</p>
				<span className='food-container__time'>
					<ion-icon name='timer-outline'></ion-icon>
					<p className='food-container__time-text'>25-30 min</p>
				</span>
			</div>

			<div className='food-container__footer'>
				<p>$15</p>
				<button className='btn category__btn category__btn-active food-container__button'>
					Order
				</button>
			</div>
		</div>
	);
}
